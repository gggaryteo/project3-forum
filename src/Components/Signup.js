import React, { useState } from "react";
import { useNavigate } from "react-router";

// import styles
import './Signup.css'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password
    }
    console.log("Details Submitted:", data)
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label>
        <span>Enter username:</span>
        <input 
          required 
          type="text" 
          placeholder="Your Name" 
          value={username} 
          onChange={(e) => {setUsername(e.target.value)}}
          />
      </label>

      <label>
        <span>Enter email:</span>
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
        />
      </label>

      <label>
        <span>Enter password:</span>
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
        />
      </label>
      <button className="btn">Create Account</button>
    </form>
  );
};

export default Signup;
