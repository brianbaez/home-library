import React from "react";
import {Link} from "react-router-dom";

function SignInPage() {
  return (
    <div className="SignIn d-flex justify-content-center align-items-center">
      <div className="p-5">
        <div className="home-library-icon text-center">
          <Link to="/">
            <i className="fa-solid fa-book-open fa-5x mb-2"></i>
            <h1>HomeLibrary</h1>
          </Link>
        </div>

        <div className="mt-4">
          <h2 className="text-center">Sign In</h2>

          <form className="sign-in-form p-4">
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"></input>
              <label htmlFor="floatingEmail">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
              <label htmlFor="floatingPassword">Password</label>
              <div className="mt-1">
                <Link to="/resetpassword">Forgot your password?</Link>
              </div>
            </div>

            <div className="checkbox mb-3">
              <label className="d-flex justify-content-center align-items-center">
                <input type="checkbox" value="remember-me"></input>
                <p className="mb-0 ms-1">Remember Me</p>
              </label>
            </div>

            <button className="w-100 btn btn-lg" type="submit">Sign In</button>

            <div className="text-center mt-3">
              <Link to="/signup">Don't have an account yet? Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
