import React, {useState} from "react";

function ReviewText(reviewTextProps) {
  // Props
  const {reviewText, setReviewText} = reviewTextProps;

  return (
    <div className="ReviewText mt-3">
      <p>What did you think of this book?</p>
      <textarea className="form-control" id="review" placeholder="Write a review (optional)" value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
    </div>
  );
}

export default ReviewText;
