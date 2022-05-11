import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function SignInForm(signInProps) {
  // Props
  const {config, navigate} = signInProps;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInHandler = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post("/api/auth/signin", {email, password}, config);

      localStorage.setItem("authToken", data.token);

      navigate("/home");
    }
    catch(error) {
      setError(error.response.data.error);

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

  return (
    <div className="SignInForm mt-4">
      <h2 className="text-center">Sign In</h2>

      <form className="sign-in-form p-4" onSubmit={signInHandler}>
        {error && <span className="error-message">{error}</span>}

        <div className="form-floating mb-3">
          <input required type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <label htmlFor="floatingEmail">Email address</label>
        </div>

        <div className="form-floating mb-3">
          <input required type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <label htmlFor="floatingPassword">Password</label>
          <div className="mt-1">
            <Link to="/forgotpassword">Forgot your password?</Link>
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
          <Link to="/signup">
            <a>Don't have an account yet? Sign up</a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
