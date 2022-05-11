import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import Email from "./Email";
import Username from "./Username";

function AccountDetails(accountDetailsProps) {
  const {config, email, setEmail, username, setUsername} = accountDetailsProps;

  const [newEmail, setNewEmail] = useState();
  const [newUsername, setNewUsername] = useState();

  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setNewEmail(email);
    setNewUsername(username);
  }, [email, username]);

  const updateAccountDetailsHandler = async (e) => {
    e.preventDefault();

    // Update user email
    const updateEmail = async () => {
      if(newEmail !== email) {
        setEmail(newEmail);
        return await axios.put(`/api/private/account/edit/email`, {newEmail: newEmail}, config);
      }
    }

    // Update username
    const updateUsername = async () => {
      if(newUsername !== username) {
        setUsername(newUsername);
        return await axios.put(`/api/private/account/edit/username`, {newUsername: newUsername}, config);
      }
    }

    // Execute promises
    await Promise.all([updateEmail(), updateUsername()])
    .then((res) => {
      res.map((result) => {
        if(result !== undefined) {
          setSuccess("Account details updated successfully");

          setTimeout(() => {
            setSuccess();
          }, 5000);
        }
      })
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
      <Email newEmail={newEmail} setNewEmail={setNewEmail}/>
      <Username newUsername={newUsername} setNewUsername={setNewUsername}/>

      <div className="UpdateButton">
        <button className="btn btn-sm" type="submit">Update</button>
        {success && <span className="ms-3">{success}</span>}
        {error && <span className="ms-3">{error}</span>}
      </div>

    </form>
  );
}

export default AccountDetails;
