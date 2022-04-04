import React from "react";

function SignUpPage() {
  return (
    <div className="SignUp d-flex justify-content-center align-items-center">
      <div className="p-5">
        <div className="home-library-icon text-center">
          <i class="fa-solid fa-book-open fa-5x mb-2"></i>
          <h1>HomeLibrary</h1>
        </div>

        <div className="mt-4">
          <h2 className="text-center">Sign Up</h2>

          <form className="p-4">
            <div className="form-floating mb-3">
              <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com"></input>
              <label for="floatingEmail">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input type="text" class="form-control" id="floatingUsername" placeholder="Username"></input>
              <label for="floatingUsername">Username</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
              <label for="floatingPassword">Password</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" class="form-control" id="floatingPasswordConfirmation" placeholder="Confirm Password"></input>
              <label for="floatingPassword">Confirm password</label>
            </div>

            <button class="w-100 btn btn-lg" type="submit">Sign Up</button>

            <div className="text-center mt-3">
              <a href="#">Already have an account? Sign in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
