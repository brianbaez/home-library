import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import SaveButton from "../SaveButton";

function Password({config}) {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const updatePasswordHandler = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      setError("Passwords do not match");

      setTimeout(() => {
        setError();
      }, 5000);
    }
    else {
      await axios.put(`/api/private/account/edit/password`, {newPassword: password}, config)
      .then((res) => {
        setSuccess(res.data.message);

        setTimeout(() => {
          setSuccess();
          setPassword("");
          setConfirmPassword("");
        }, 5000);
      })
      .catch((error) => {
        setError(error.resposne.data.error);
      });
    }
  }

  return (
    <div className="Password mt-5 mb-3">
      <h4>Password</h4>
      <hr></hr>
      <button className="btn" type="button" data-bs-toggle="collapse" data-bs-target="#updatePassword" aria-expanded="false" aria-controls="updatePassword">Update Password</button>

      <form className="UpdatePasswordFields collapse mt-3" id="updatePassword" onSubmit={updatePasswordHandler}>
        <div className="form-group">
          <div className="NewPassword mb-3">
            <p className="mb-1">New Password</p>
            <input required type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <div className="ConfirmNewPassword">
            <p className="mb-1">Confirm New Password</p>
            <input required type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
          </div>
          <div className="mt-3">
            <SaveButton success={success} error={error}/>
          </div>
        </div>
      </form>


    </div>
  );
}

export default Password;
