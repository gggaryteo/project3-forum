import { useState } from "react";
import AuthPageContainer from "../Components/AuthPageContainer";
import LoginForm from "../Components/LoginForm";

function Login() {
  const [errorMessage, setErrorMessage] = useState();

  const handleError = (error) => {
    setErrorMessage(error);
  };

  return (
    <AuthPageContainer
      error={errorMessage}
      path="/register"
      text="Need an account?"
      title="Sign in"
    >
      <LoginForm onError={handleError} />
    </AuthPageContainer>
  );
}

export default Login;
