import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function ForgotPasswordForm({config}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post("/api/auth/forgotpassword", {email}, config);
      setSuccess(data.data);
    }
    catch(error) {
      setError(error.response.data.error);
      setEmail("");

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="ForgotPasswordForm mt-4">
      <h2 className="text-center">Reset Your Password</h2>

      <form className="forgot-password-form p-4" onSubmit={forgotPasswordHandler}>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-floating mb-3">
          <input required type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <label htmlFor="floatingEmail">Email address</label>
        </div>

        <button className="w-100 btn btn-lg" type="submit">Send Instructions</button>

        <div className="mt-3 text-center">
          <Link to="/signin">Return to sign in</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
