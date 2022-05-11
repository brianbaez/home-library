import React from "react";
import axios from "axios";

function DeleteReview(deleteReviewProps) {
  // Props
  const {config, isbn, setReview, setReviewText, setError} = deleteReviewProps;

  const deleteReviewHandler = async (e) => {
    e.preventDefault();

    if(window.confirm("Are you sure you want to delete this review?")) {
      const deleteReview = async () => {
        return await axios.delete(`/api/private/reviews/${isbn}`, config);
      }

      const deleteBookshelf = async () => {
        return await axios.delete(`/api/private/bookshelves/reviewed/${isbn}`, config);
      }

      await Promise.all([deleteReview(), deleteBookshelf()])
      .then((res) => {
        setReview();
        setReviewText();
        setError("This book does not have a review");
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
