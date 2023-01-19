import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

// import Context, Hooks
import { useAuth } from "../context/AuthContext";
import userLogin from "../services/userLogin";
// import { getChat } from "../services/getChat";

// import styles

function LoginForm({ onError }) {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [{ username, email, password }, setForm] = useState({
    email: "",
    password: "",
  });

  const { setAuthState } = useAuth();
  const navigate = useNavigate();



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ username, email, password });

    userLogin({ email, password })
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
    <form className="form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>
        <span>Enter email:</span>
        <input
          name="email"
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleInput}
          autoFocus
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
          minLength="8"
        />
      </label>
      <button className="btn">Login</button>
    </form>
  );
}

export default LoginForm;
