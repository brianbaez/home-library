import React, {useState} from "react";

function ReviewText(reviewTextProps) {
  // Props
  const {reviewText, setReviewText} = reviewTextProps;
  
  return (
    <div className="ReviewText mt-3">
      <h4>What did you think about this book?</h4>
      <textarea className="form-control" id="review" placeholder="Write a review (optional)" value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
    </div>
  );
}

export default ReviewText;
