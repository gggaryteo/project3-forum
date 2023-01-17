import { useState } from "react";
import AuthPageContainer from "../Components/AuthPageContainer";
import SignUpForm from "../Components/SignupForm";

function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (error) => {
    console.log(error);
    setErrorMessage(error);
  };

  console.log(errorMessage);

  return (
    <AuthPageContainer
      error={errorMessage}
      path="/login"
      text="Sign in to your account"
    >
      <SignUpForm onError={handleError} />
    </AuthPageContainer>
  );
}

export default SignUp;
