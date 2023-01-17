// Packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Import Route Components
import App from "./App";
import Home from './Components/Home';
import HomePosts  from './Components/HomePosts';
import Login  from './routes/Login';
import Signup  from './routes/Signup';
import EditProfile from './Components/EditProfile';
import CreatePost from './Components/CreatePost';
import Post from './Components/Post/Post';
import CommentSection  from './Components/Post/CommentSection';
import Profile from './Components/Profile/Profile';
import ProfilePosts  from './Components/Profile/ProfilePosts';
import ProfileFavoritePosts  from './Components/Profile/ProfileFavoritePosts';
import ErrorNotFound from './Components/ErrorNotFound';

// Import Context
import AuthProvider from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<App />}>
            {/* Note: render child route at the parent route level so all posts will be shown*/}
            <Route path="/" element={<Home />}>
              <Route index element={<HomePosts />} />
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
              <Route index element={<ProfilePosts />} />
              <Route path="favorites" element={<ProfileFavoritePosts />} />
            </Route>
          </Route>

          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
