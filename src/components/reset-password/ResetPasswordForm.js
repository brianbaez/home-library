import React, {useState} from "react";
import axios from "axios";

function ResetPasswordForm(resetPasswordProps) {
  // Props
  const {config, navigate, resetToken} = resetPasswordProps;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

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
    <div className="ResetPasswordForm mt-4">
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
  );
}

export default ResetPasswordForm;
