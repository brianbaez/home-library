import React from "react";

// Components
import HomeLibraryIcon from "../components/HomeLibraryIcon";
import ForgotPasswordForm from "../components/forgot-password/ForgotPasswordForm";

function ForgotPasswordPage({config}) {
  return (
    <div className="ForgotPassword d-flex justify-content-center align-items-center">
      <div className="p-5">
        <HomeLibraryIcon />
        <ForgotPasswordForm config={config}/>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
