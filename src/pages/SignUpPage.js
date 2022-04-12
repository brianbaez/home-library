import React from "react";
import {Link} from "react-router-dom";

function SignUpPage() {
  return (
    <div className="SignUp d-flex justify-content-center align-items-center">
      <div className="p-5">
        <div className="home-library-icon text-center">
          <Link to="/">
            <i className="fa-solid fa-book-open fa-5x mb-2"></i>
            <h1>HomeLibrary</h1>
          </Link>
        </div>

        <div className="mt-4">
          <h2 className="text-center">Sign Up</h2>

          <form className="sign-up-form p-4">
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"></input>
              <label htmlFor="floatingEmail">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingUsername" placeholder="Username"></input>
              <label htmlFor="floatingUsername">Username</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="floatingPasswordConfirmation" placeholder="Confirm Password"></input>
              <label htmlFor="floatingPassword">Confirm password</label>
            </div>

            <button className="w-100 btn btn-lg" type="submit">Sign Up</button>

            <div className="text-center mt-3">
              <Link to="/signin">Already have an account? Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
