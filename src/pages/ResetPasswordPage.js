import React from "react";
import {Link} from "react-router-dom";

function ResetPasswordPage() {
  return (
    <div className="ResetPassword d-flex justify-content-center align-items-center">
      <div className="p-5">
        <div className="home-library-icon text-center">
          <Link to="/">
            <i className="fa-solid fa-book-open fa-5x mb-2"></i>
            <h1>HomeLibrary</h1>
          </Link>
        </div>

        <div className="mt-4">
          <h2 className="text-center">Reset Password</h2>

          <form className="reset-password-form p-4">
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"></input>
              <label for="floatingEmail">Email address</label>
            </div>

            <button className="w-100 btn btn-lg" type="submit">Send Instructions</button>

            <div className="mt-3 text-center">
              <Link to="/signin">Return to sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
