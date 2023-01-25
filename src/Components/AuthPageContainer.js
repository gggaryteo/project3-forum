import { Link } from "react-router-dom";

function AuthPageContainer({ children, error, path, text}) {
  console.log(error);
  return (
    <div>
      <p style={{marginBlock:"20px" ,textAlign:"center"}}><Link to={path}>{text}</Link></p>
          {error && <div className="error">{error}</div>}
          {children}
    </div>
  );
}

export default AuthPageContainer;
