import React from "react";
import axios from "axios";

function DeleteChallenge(deleteChallengeProps) {
  // Props
  const {config, year, success, setSuccess} = deleteChallengeProps;

  const deleteChallengeHandler = async (e) => {
    e.preventDefault();

    if(window.confirm("Are you sure you want to delete this challenge? All records will be deleted.")) {
      // Delete challenge for the year
      await axios.delete(`/api/private/challenges/${year}`, config)
      .then((res) => {
        setSuccess(res.data.message);

        setTimeout(() => {
          setSuccess();
        }, 1000);
      })
      .catch((error) => {})
    }
  }
  return (
    <div className="DeleteChallenge flex-fill mt-3">
      <a href="#" onClick={deleteChallengeHandler} style={{color: "red"}}>Delete {year} challenge</a>
    </div>
  );
}

export default DeleteChallenge;
