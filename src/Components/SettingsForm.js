import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import updateUser from "../services/updateUser";

import "./SettingsForm.css"

function SettingsForm() {
  const { headers, isAuth, loggedUser, setAuthState } = useAuth();
  const [{ biography, email, profileimg, password, username }, setForm] = useState({
    biography: loggedUser.biography || "",
    email: loggedUser.email,
    profileimg: loggedUser.profileimg || "",
    password: loggedUser.password || "",
    username: loggedUser.username,
  });

  const [inactive, setInactive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth, loggedUser, navigate]);

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
    setInactive(false);
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (inactive) return;

    updateUser({ headers, biography, email, profileimg, password, username })
      .then(setAuthState)
      .catch(console.error);
    setInactive(true);
  };

  return (
    isAuth && (
      <form className="settings-form" onSubmit={formSubmit}>
        <label>
          <span>Profile URL:</span>
          <input
            name="profileimg"
            required
            value={profileimg}
            onChange={inputHandler}
          />
        </label>

        <label>
          <span>Your Username:</span>
          <input
            name="username"
            required
            value={username}
            onChange={inputHandler}
          />
        </label>

        <label>
          <span>About yourself:</span>
          <textarea
            name="biography"
            required
            rows="8"
            value={biography}
            onChange={inputHandler}
          ></textarea>
        </label>

        <label>
          <span>Update Email:</span>
          <input
            name="email"
            required
            value={email}
            onChange={inputHandler}
          />
        </label>

        <label>
          <span>Update Password:</span>
          <input
            name="password"
            required
            value={password}
            onChange={inputHandler}
          />
        </label>

      {!inactive && (
            <button className="btn"> Update Settings </button>
      )}
      </form>
    )
  );
}

export default SettingsForm;