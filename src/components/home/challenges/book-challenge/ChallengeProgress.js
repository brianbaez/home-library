import React from "react";

function ChallengeProgress(bookChallengeProps) {
  const {challenges, scheduleStatus, progressPercentage} = bookChallengeProps;

  return (
    <div className="ChallengeProgress ms-3">
      <div className="ProgressInfo">
        <h5 className="fs-1 mb-0">{challenges.booksCompleted}</h5>
        <p className="fs-4 m-0">{(challenges.booksCompleted === 1) ? <span>book</span> : <span>books</span>} read</p>
        <p className="m-0">{scheduleStatus}</p>
      </div>
      <div className="ProgressBar d-flex align-items-center">
        <div className="progress w-50 me-2">
          <div className="progress-bar" role="progresbar" style={{width: `${progressPercentage}%`}} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div>
          <span>{challenges.booksCompleted}</span>
          <span>/{challenges.bookGoal} </span>
          <span>({progressPercentage}%)</span>
        </div>
      </div>
    </div>
  );
}

export default ChallengeProgress;
