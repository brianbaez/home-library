import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

// Components
import HomeLibraryIcon from "../components/HomeLibraryIcon";
import SignInForm from "../components/sign-in/SignInForm";

function SignInPage({config}) {
  const navigate = useNavigate();
  const signInProps = {config, navigate};

  useEffect(() => {
    if(localStorage.getItem("authToken")) {
      navigate("/home");
    }
  });

  return (
    <div className="SignIn d-flex justify-content-center align-items-center">
      <div className="p-5">
        <HomeLibraryIcon />
        <SignInForm {...signInProps}/>
      </div>
    </div>
  );
}

export default SignInPage;
