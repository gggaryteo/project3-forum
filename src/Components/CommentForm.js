import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import postComment from "../services/postComment";
import Avatar from "@mui/material/Avatar";

function CommentForm({ updateComments }) {
  const [{ content }, setForm] = useState({ content: "" });
  const { headers, isAuth, loggedUser } = useAuth();
  const { username, profileimg } = loggedUser || {};
  const { slug } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.trim() === "") return;

    postComment({ content, headers, slug })
      .then(updateComments)
      .then(setForm({ content: "" }))
      .catch(console.error);
  };

  const handleChange = (e) => {
    console.log(e.target.value)
    setForm({ content: e.target.value });
  };

  return isAuth ? (
    <form onSubmit={handleSubmit}>
      <label>
        <textarea
          className="form-control"
          onChange={handleChange}
          placeholder="Write a comment..."
          rows="3"
          value={content}
        ></textarea>
      </label>

      <div className="card-footer">
        <Avatar alt={username} className="comment-author-img" src={profileimg} />
        <button className="btn">Post Comment</button>
      </div>
    </form>
  ) : (
    <span>
      <Link to="/login">Sign in</Link> or <Link to="/register">Sign up</Link> to
      add comments on this article.
    </span>
  );
}

export default CommentForm;
