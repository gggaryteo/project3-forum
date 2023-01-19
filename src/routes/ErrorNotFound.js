import { Link } from "react-router-dom";

function ErrorNotFound() {
  return (
    <div className="not-found">
      <h1>404 Not Found</h1>
      <Link to="/">Redirect To Home</Link>
    </div>
  );
}

export default ErrorNotFound;
