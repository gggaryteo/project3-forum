// Packages
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";


// Import Route Components
import App from "./App";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import EditProfile from "./routes/EditProfile";
import CreatePost from "./routes/CreatePost";
import Post from "./routes/Post/Post";
import CommentSection from "./routes/Post/CommentSection";
import Profile from "./routes/Profile/Profile";
import ErrorNotFound from "./routes/ErrorNotFound";

// Import Context
import AuthProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<App />}>
            {/* Note: render child route at the parent route level so all posts will be shown*/}
            <Route path="/" element={<Home />}>
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />

            <Route path="editprofile" element={<EditProfile />} />

            <Route path="createpost" element={<CreatePost />}>
              <Route path=":slug" element={<CreatePost />} />
            </Route>

            {/* Note: render child route at the parent route level so all comments will be shown*/}
            <Route path="post/:slug" element={<Post />}>
              <Route index element={<CommentSection />} />
            </Route>

            <Route path="profile/:username" element={<Profile />}>
            </Route>
          </Route>

          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
