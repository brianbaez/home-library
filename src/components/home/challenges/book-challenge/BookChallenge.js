import React from "react";

// Components
import IconAndButton from "./IconAndButton";
import ChallengeProgress from "./ChallengeProgress";

function BookChallenge(bookChallengeProps) {
  return (
    <div className="BookChallenge d-flex">
      <IconAndButton />
      <ChallengeProgress {...bookChallengeProps}/>
    </div>
  );
}

export default BookChallenge;
