import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import './CommentAuthor.css'

function CommentAuthor({ biography, profileimg, username }) {
  return (
    <div className="comment-card">
      <Link
        className="comment-author"
        state={{ biography, profileimg, username }}
        to={`/profile/${username}`}
      >
        <Avatar alt={username} className="comment-author-img" src={profileimg} />
      </Link>

      <div>
      <Link
        className="comment-author"
        state={{ biography, profileimg, username }}
        to={`/profile/${username}`}
        style={{textDecoration: "none"}}
      >
        {username}
      </Link>
      </div>

    </div>
  );
}
export default CommentAuthor;
