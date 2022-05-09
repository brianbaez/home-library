import React from "react";
import axios from "axios";

function DeleteReview(deleteReviewProps) {
  // Props
  const {config, isbn, setReview} = deleteReviewProps;

  const deleteReviewHandler = async (e) => {
    e.preventDefault();

    if(window.confirm("Are you sure you want to delete this review?")) {
      await axios.delete(`/api/private/reviews/${isbn}`, config)
      .then((res) => {
        setReview();
      })
      .catch((error) => {});
    }
  }

  return (
    <div className="DeleteReview">
      <hr className="my-3"></hr>
      <a className="m-0" href="#" onClick={(e) => deleteReviewHandler(e)}>Delete</a>
    </div>
  );
}

export default DeleteReview;
