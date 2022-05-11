import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import Rating from "./Rating";
import ReviewText from "./ReviewText";
import SaveButton from "../../SaveButton";
import DeleteReview from "./DeleteReview";

function EditReview(editReviewProps) {
  // Props
  const {config, isbn, success, setSuccess, error, setError, wholeNumber, setWholeNumber, decimalNumber, setDecimalNumber, reviewText, setReviewText, setReview} = editReviewProps

  const ratingProps = {wholeNumber, setWholeNumber, decimalNumber, setDecimalNumber};
  const reviewTextProps = {reviewText, setReviewText};
  const deleteReviewProps = {config, isbn, setReview, setReviewText, setError};

  const editReviewHandler = async (e) => {
    e.preventDefault();

    const data = {
      wholeNumber: wholeNumber.toString(),
      decimalNumber: decimalNumber.toString(),
      text: reviewText
    }

    await axios.put(`/api/private/reviews/${isbn}`, data, config)
    .then((res) => {
      setSuccess(res.data.message);

      setTimeout(() => {
        setSuccess();
      }, 5000);
    })
    .catch((error) => {});
  }

  return (
    <div className="EditReview">
      <button type="button" className="btn btn-sm" data-bs-toggle="collapse" data-bs-target={`#editReview`} aria-expanded="false" aria-controls={`editReview`}>Edit Review</button>
      <form className="EditReviewFields collapse mt-3" id="editReview" onSubmit={editReviewHandler}>
        <Rating {...ratingProps} />
        <ReviewText {...reviewTextProps}/>
        <div className="mt-3">
          <SaveButton success={success} error={error}/>
        </div>
        <DeleteReview {...deleteReviewProps}/>
      </form>
    </div>
  );
}

export default EditReview;
