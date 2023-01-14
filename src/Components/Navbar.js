// styles and images
import "./Navbar.css";
import ProjectLogo from "../assets/Foongrum.png";


// import React Packages
import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa";



function Navbar() {
  return (
    <div className="navbar">
      <nav className="links">

        <ul>
          <li className="logo">
            <img src={ProjectLogo} alt="project-logo" />
          </li>
          <li>
            <NavLink to="/"> <FaHome/> Home</NavLink>
          </li>
          <li>
            <NavLink to="/login"> <FaSignInAlt/> Login</NavLink>
          </li>
          <li>
            <NavLink to="/register"> <FaUserPlus/> Signup</NavLink>
          </li>
        </ul>

      </nav>
    </div>
  );
}
export default Navbar;
