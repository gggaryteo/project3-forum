import { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import getProfile from "../services/getProfile";
import Avatar from "@mui/material/Avatar";
import { FaCog, FaInstagram, FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import './AuthorInfo.css'

function AuthorInfo() {
  const { state } = useLocation();
  
  const [{ biography, profileimg }, setAuthor] = useState(
    state || {}
  );
  const { isAuth, headers, loggedUser } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.bio === biography) return;

    getProfile({ headers, username })
      .then(setAuthor)
      .catch((error) => {
        console.error(error);
        navigate("/not-found", { replace: true });
      });
  }, [username, headers, state, navigate]);

  return isAuth ? (
    <div className="card">
      <Avatar
        alt={username}
        className="card__image"
        style={{ width: "160px", height: "160px" }}
        src={profileimg}
      />
      <p className="card__name">{username}</p>

      <ul className="icons">
        <li>
          <a href="#">
            <FaInstagram className="icon" />
          </a>
        </li>
        <li>
          <a href="#">
            <FaFacebook className="icon" />
          </a>
        </li>
        <li>
          <a href="#">
            <FaTwitter className="icon" />
          </a>
        </li>
        <li>
          <a href="#">
            <FaGithub className="icon" />
          </a>
        </li>
      </ul>
      {biography ? biography : "No biography available"}
      {username === loggedUser.username ? (
        <button className="button draw-border">
          <NavLink className="edit-link" to="/editprofile">
            {" "}
            Edit Profile{" "}
          </NavLink>
        </button>
      ) : null}
      <button className="button draw-border">Message</button>
    </div>
  ) : (
    <span className="center-text-unauth">
      <Link to="/login" style={{ marginRight: "10px", color: "blue" }}>
        Sign in
      </Link>
      or
      <Link
        to="/register"
        style={{ marginLeft: "10px", marginRight: "10px", color: "blue" }}
      >
        Sign up
      </Link>
      to see User Profile.
    </span>
  );;
}

export default AuthorInfo;
