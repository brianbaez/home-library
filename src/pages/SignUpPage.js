import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function SignUpPage() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signUpHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }

    if(password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Password do not match");
    }

    try {
      const {data} = await axios.post("/api/auth/signup", {username, email, password}, config);

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

          <form className="sign-up-form p-4" onSubmit={signUpHandler}>
            {error && <p className="error-message">{error}</p>}

            <div className="form-floating mb-3">
              <input required type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              <label htmlFor="floatingEmail">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input required type="text" className="form-control" id="floatingUsername" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
              <label htmlFor="floatingUsername">Username</label>
            </div>

            <div className="form-floating mb-3">
              <input required type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-floating mb-3">
              <input required type="password" className="form-control" id="floatingPasswordConfirmation" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
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
