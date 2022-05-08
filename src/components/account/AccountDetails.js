import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import Email from "./Email";
import Username from "./Username";

function AccountDetails(accountDetailsProps) {
  const {config, email, setEmail, username, setUsername} = accountDetailsProps;
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const updateAccountDetailsHandler = async (e) => {
    e.preventDefault();

    const updateEmail = async () => {
      return await axios.put(`/api/private/account/edit/email`, {newEmail: email}, config);
    }

    const updateUsername = async () => {
      return await axios.put(`/api/private/account/edit/username`, {newUsername: username}, config);
    }

    await Promise.all([updateEmail(), updateUsername()])
    .then((res) => {
      setSuccess("Account details updated successfully");

      setTimeout(() => {
        setSuccess();
      }, 5000);
    })
    .catch((error) => {
      setError("Failed to update account details");

      setTimeout(() => {
        setError();
      }, 5000);
    });
  }

  return (
    <form className="AccountDetails" onSubmit={updateAccountDetailsHandler}>
      <h4>Account Details</h4>
      <hr className="my-3"></hr>

      <Email email={email} setEmail={setEmail}/>
      <Username username={username} setUsername={setUsername}/>

      <div className="UpdateButton">
        <button className="btn" type="submit">Update</button>
        {success && <span className="ms-3">{success}</span>}
        {error && <span className="ms-3">{error}</span>}
      </div>
    </form>
  );
}

export default AccountDetails;
