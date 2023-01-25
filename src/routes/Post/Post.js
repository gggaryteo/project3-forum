import React from 'react'
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import getPost from "../../services/getPost";
import PostMeta from '../../Components/PostMeta';
import Markdown from "markdown-to-jsx";

// styles
import './Post.css'

const Post = () => {

  const { state } = useLocation();
  const [post, setPost] = useState(state || {});
  const { title, content, tagList, createdAt, author } = post || {};
  const { headers, isAuth } = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (state) return;

    getPost({ slug, headers })
      .then(setPost)
      .catch((error) => {
        console.error(error);
        navigate("/not-found", { replace: true });
      });
  }, [isAuth, slug, headers, state, navigate]);


  return (
    <div>
      <div className="content-page">
        <div className="author-info">
          <PostMeta author={author} createdAt={createdAt} />
        </div>
        <h1>{title}</h1>
        <p>
          {content && (
            <Markdown options={{ forceBlock: true }}>{content}</Markdown>
          )}
        </p>
      </div>
      <Outlet />
    </div>
  );
}

export default Post;
