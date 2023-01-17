import React, { useState } from "react";
import { useNavigate } from "react-router";

// import Context, Hooks
import { useAuth } from "../context/AuthContext";
import userSignUp from "../services/userSignUp";

// import styles
import "./SignupForm.css";

function SignupForm ({ onError }){
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [{ username, email, password }, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ username, email, password });

    userSignUp({username, email, password})
      .then(setAuthState)
      .then(() => navigate("/"))
      .catch(onError);
  };

    const handleInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setForm((form) => ({ ...form, [name]: value }));
    };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label>
        <span>Enter username:</span>
        <input
          name="username"
          required
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={handleInput}
        />
      </label>

      <label>
        <span>Enter email:</span>
        <input
          name="email"
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleInput}
        />
      </label>

      <label>
        <span>Enter password:</span>
        <input
          name="password"
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleInput}
        />
      </label>
      <button className="btn">Create Account</button>
    </form>
  );
};

export default SignupForm;
