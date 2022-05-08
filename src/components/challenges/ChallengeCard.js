import React from "react";

// Components
import BookGoal from "./book/BookGoal";
import PagesGoal from "./pages/PagesGoal";

function ChallengeCard(props) {
  // Props
  const {config, success, setSuccess, error, setError} = props.challengeCardProps;
  const {year, bookGoal, booksCompleted, pageGoal, pagesCompleted} = props.challenge;

  const bookGoalProps = {config, year, bookGoal, booksCompleted, success, setSuccess, error, setError};
  const pagesGoalProps = {config, year, pageGoal, pagesCompleted, success, setSuccess, error, setError};

  return (
    <div className="ReadingChallenges shadow-sm border row mb-5 py-3 px-3">
      <BookGoal {...bookGoalProps}/>
      <PagesGoal {...pagesGoalProps}/>
  </div>
  );
}

export default ChallengeCard;
