import React from "react";
import {useParams, useNavigate} from "react-router-dom";

// Components
import HomeLibraryIcon from "../components/HomeLibraryIcon";
import ResetPasswordForm from "../components/ResetPasswordForm";

function ResetPasswordPage({config}) {
  const navigate = useNavigate();
  const {resetToken} = useParams();
  const resetPasswordProps = {config, navigate, resetToken};

  return (
    <div className="ResetPassword d-flex justify-content-center align-items-center">
      <div className="p-5">
        <HomeLibraryIcon />
        <ResetPasswordForm {...resetPasswordProps}/>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
