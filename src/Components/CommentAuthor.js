import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

function CommentAuthor({ biography, profileimg, username }) {
  return (
    <>
      <Link
        className="comment-author"
        state={{ biography, profileimg, username }}
        to={`/profile/${username}`}
      >
        <Avatar alt={username} className="comment-author-img" src={profileimg} />
      </Link>
      <Link
        className="comment-author"
        state={{ biography, profileimg, username }}
        to={`/profile/${username}`}
      >
        {username}
      </Link>
    </>
  );
}
export default CommentAuthor;
