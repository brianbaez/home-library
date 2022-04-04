import React from "react";

function SignInPage() {
  return (
    <div className="SignIn d-flex justify-content-center align-items-center">
      <div className="p-5">
        <div className="home-library-icon text-center">
          <i class="fa-solid fa-book-open fa-5x mb-2"></i>
          <h1>HomeLibrary</h1>
        </div>

        <div className="mt-4">
          <h2 className="text-center">Sign In</h2>

          <form className="p-4">
            <div className="form-floating mb-3">
              <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com"></input>
              <label for="floatingEmail">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
              <label for="floatingPassword">Password</label>
              <div className="mt-1">
                <a className="text-start" href="/">Forgot your password?</a>
              </div>
            </div>

            <div class="checkbox mb-3">
              <label className="d-flex justify-content-center align-items-center">
                <input type="checkbox" value="remember-me"></input>
                <p className="mb-0 ms-1">Remember Me</p>
              </label>
            </div>

            <button class="w-100 btn btn-lg" type="submit">Sign In</button>

            <div className="text-center mt-3">
              <a href="#">Don't have an account yet? Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
