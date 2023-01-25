import React from 'react'
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const Post = () => {
  return (
    <div>
      Post
      <Outlet />
    </div>
  );
}

export default Post;
