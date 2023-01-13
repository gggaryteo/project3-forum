// Packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Import Route Components
import App from "./App";
import Home from './routeComponents/Home';
import HomePosts  from './routeComponents/HomePosts';
import Login  from './routeComponents/Login';
import Register  from './routeComponents/Register';
import EditProfile from './routeComponents/EditProfile';
import CreatePost from './routeComponents/CreatePost';
import Post from './routeComponents/Post/Post';
import CommentSection  from './routeComponents/Post/CommentSection';
import Profile from './routeComponents/Profile/Profile';
import ProfilePosts  from './routeComponents/Profile/ProfilePosts';
import ProfileFavoritePosts  from './routeComponents/Profile/ProfileFavoritePosts';
import ErrorNotFound from './routeComponents/ErrorNotFound';


// Notes: Index Routes for

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route element={<App />}>
          {/* Note: render child route at the parent route level so all posts will be shown*/}
          <Route path="/" element={<Home />}>
            <Route index element={<HomePosts />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="editprofile" element={<EditProfile />} />

          <Route path="createpost" element={<CreatePost />}>
            <Route path=":slug" element={<CreatePost />} />
          </Route>

          {/* Note: render child route at the parent route level so all comments will be shown*/}
          <Route path="post/:slug" element={<Post />}>
            <Route index element={<CommentSection />} />
          </Route>

          <Route path="profile/:username" element={<Profile />}>
            <Route index element={<ProfilePosts />} />
            <Route path="favorites" element={<ProfileFavoritePosts />} />
          </Route>

        </Route>

        <Route path="*" element={<ErrorNotFound />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
