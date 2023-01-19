// styles and images
import "./Navbar.css";
import ProjectLogo from "../assets/Foongrum.png";


// import packages
import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPen, FaSignInAlt, FaUserPlus } from "react-icons/fa";

// import misc
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";


function Navbar() {

  const { isAuth } = useAuth();

  return (
    <div className="navbar">
      <nav className="links">
        <ul>
          <li className="logo">
            <img src={ProjectLogo} alt="project-logo" />
          </li>
          <li>
            <NavLink to="/"><FaHome /> Home</NavLink>
          </li>

          {isAuth && (
            <>
              <NavLink to="/createpost"> <FaPen /> New Post</NavLink>
              <DropdownMenu />
            </>
          )}

          {!isAuth && (
            <>
              <li>
                <NavLink to="/login"><FaSignInAlt /> Login</NavLink>
              </li>
              <li>
                <NavLink to="/register"><FaUserPlus /> Signup</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
