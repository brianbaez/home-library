import React, {useState} from "react";
import axios from "axios";

// Components
import Rating from "./Rating.js"
import ReviewText from "./ReviewText";
import SaveButton from "../../SaveButton";

function AddReview(addReviewProps) {
  // Props
  const {config, isbn, reviewText, setReviewText, success, setSuccess, error, setError} = addReviewProps;

  const [wholeNumber, setWholeNumber] = useState("0");
  const [decimalNumber, setDecimalNumber] = useState("0");

  const ratingProps = {wholeNumber, setWholeNumber, decimalNumber, setDecimalNumber};
  const reviewTextProps = {reviewText, setReviewText};

  const addReviewHandler = async (e) => {
    e.preventDefault();

    const data = {
      wholeNumber: wholeNumber,
      decimalNumber: decimalNumber,
      text: reviewText
    }

    // Add review for the book (ISBN)
    const addReview = async () => {
      return await axios.post(`/api/private/reviews/${isbn}`, data, config);
    }

    // Add bookshelf for the book (ISBN)
    const addBookshelf = async () => {
      return await axios.post(`/api/private/bookshelves/reviewed/${isbn}`, {}, config);
    }

    // Execute promises
    await Promise.all([addReview(), addBookshelf()])
    .then((res) => {
      setSuccess("Review has been added");
      setError();

      setTimeout(() => {
        setSuccess();
      }, 5000);
    })
    .catch((error) => {});
  }


  return (
    <div className="AddReview">
      <p>{error}</p>
      <button className="btn btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#writeReview" aria-expanded="false" aria-controls="writeReview">Write a Review</button>

      <form className="WriteReviewFields collapse mt-3" id="writeReview" onSubmit={addReviewHandler}>
          <div className="form-group d-flex flex-column">
          <Rating {...ratingProps} />
          <ReviewText {...reviewTextProps} />
          <div className="mt-3">
            <SaveButton success={success} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReview;
