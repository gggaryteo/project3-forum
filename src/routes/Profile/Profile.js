import React from 'react'
import { Outlet } from "react-router-dom";
import AuthorInfo from '../../Components/AuthorInfo';

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="user-info">
        <AuthorInfo />
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;