import React from "react";
import {useNavigate} from "react-router-dom";

// Components
import HomeLibraryIcon from "../components/HomeLibraryIcon";
import SignUpForm from "../components/SignUpForm";

function SignUpPage({config}) {
  const navigate = useNavigate();
  const signUpProps = {config, navigate};

  return (
    <div className="SignUp d-flex justify-content-center align-items-center">
      <div className="p-5">
        <HomeLibraryIcon />
        <SignUpForm {...signUpProps}/>
      </div>
    </div>
  );
}

export default SignUpPage;
