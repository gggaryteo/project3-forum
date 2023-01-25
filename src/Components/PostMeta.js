import { Link } from "react-router-dom";
import dateFormatter from "../helpers/dateFormatter";
import Avatar from "@mui/material/Avatar";

import './PostMeta.css'

function PostMeta({ author, children, createdAt }) {
  const { biography, profileimg, username } = author || {};

  return (
    <div className="post-meta">
      <Link
        state={{ biography, profileimg }}
        to={`/profile/${username}`}
      >
        <Avatar className="center" alt={username} src={profileimg} />
      </Link>
      <div className="info">
        <Link
          className="author"
          state={{ biography, profileimg }}
          to={`/profile/${username}`}
          style={{textDecoration: "none"}}
        >
          {username}
        </Link>
        <br></br>
        <span className="date">{dateFormatter(createdAt)}</span>
      </div>
      {children}
    </div>
  );
}

export default PostMeta;
