import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function DeleteAccount({config}) {
  const navigate = useNavigate();

  const deleteAccountHandler = async (e) => {
    e.preventDefault();

    if(window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      await axios.delete(`/api/private/account/delete`, config)
      .then((res) => {
        localStorage.removeItem("authToken");
        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
    }
  }

  return (
    <div className="DeleteAccount">
      <hr></hr>
      <a className="m-0" href="#" style={{color: "red"}} onClick={deleteAccountHandler}>Delete my account</a>
    </div>
  );
}

export default DeleteAccount;
