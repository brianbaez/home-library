import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import AddReview from "./AddReview";
import EditReview from "./EditReview";

function Review(reviewProps) {
  // Props
  const {config, isbn, currentStatus} = reviewProps;

  const [review, setReview] = useState();
  const [wholeNumber, setWholeNumber] = useState("0");
  const [decimalNumber, setDecimalNumber] = useState("0");
  const [reviewText, setReviewText] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const addReviewProps = {config, isbn, reviewText, setReviewText, success, setSuccess, error, setError};
  const editReviewProps = {config, isbn, success, setSuccess, error, setError, wholeNumber, setWholeNumber, decimalNumber, setDecimalNumber, reviewText, setReviewText, setReview};

  useEffect(() => {
    // Get review by ISBN
    if(isbn) {
      const fetchReview = async () => {
        await axios.get(`/api/private/reviews/${isbn}`, config)
        .then((res) => {
          if(res.data.review[0].review[0].length != 0) {
            setReview(res.data.review[0].review[0]);
          }
        })
        .catch((error) => {
          setError(error.response.data.error);
        });
      }

      fetchReview();
    }
  }, [isbn, error, success]);

  useEffect(() => {
    if(review) {
      setWholeNumber(review.rating.wholeNumber);
      setDecimalNumber(review.rating.decimalNumber);
      setReviewText(review.text);
    }
  }, [review]);

  if(currentStatus !== "Want to Read") {
    return (
      <div className="Review">
        <hr className="my-3"></hr>
        <h4>Review</h4>

        {!review &&
          <AddReview {...addReviewProps}/>
        }

        {review &&
          <div className="ReviewInfo">
            <p className="mb-3">You rated this book {review.rating.wholeNumber}.{review.rating.decimalNumber} <i class="fa-solid fa-star" style={{color: "#FFD500"}}></i></p>
            {review.text &&
              <div>
                <p className="mb-1">Here's what you had to say about it:</p>
                <p>"{review.text}"</p>
              </div>
            }
            <EditReview {...editReviewProps} />
          </div>
        }
      </div>
    );
  }
}

export default Review;
