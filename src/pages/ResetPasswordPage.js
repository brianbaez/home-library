import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

function ResetPasswordPage() {
  let navigate = useNavigate();
  let {resetToken} = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };

    if(password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Password do not match");
    }

    try {
      const {data} = await axios.put(`/api/auth/resetpassword/${resetToken}`, {password}, config);

      setSuccess(data.data);

      setTimeout(() => {
        navigate("/signin");
      }, 5000);
    }
    catch(error) {
      setError(error.response.data.error);

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

  return (
    <div className="ResetPassword d-flex justify-content-center align-items-center">
      <div className="p-5">
        <div className="home-library-icon text-center">
          <i className="fa-solid fa-book-open fa-5x mb-2"></i>
          <h1>HomeLibrary</h1>
        </div>

        <div className="mt-4">
          <h2 className="text-center">Enter a New Password</h2>

          <form className="reset-password-form p-4" onSubmit={resetPasswordHandler}>
            {error && <span className="error-message">{error}</span>}
            {success && <p className="success-message">{success}</p>}

            <div className="form-floating mb-3">
              <input required type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
              <label htmlFor="floatingPassword">New password</label>
            </div>

            <div className="form-floating mb-3">
              <input required type="password" className="form-control" id="floatingPasswordConfirmation" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
              <label htmlFor="floatingPassword">Confirm new password</label>
            </div>

            <button className="w-100 btn btn-lg" type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
