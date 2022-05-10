import React from "react";

// Components
import BookGoal from "./book/BookGoal";
import PagesGoal from "./pages/PagesGoal";
import DeleteChallenge from "./DeleteChallenge";

function ChallengeCard(props) {
  // Props
  const {config, success, setSuccess, error, setError} = props.challengeCardProps;
  const {year, bookGoal, booksCompleted, pageGoal, pagesCompleted} = props.challenge;

  const bookGoalProps = {config, year, bookGoal, booksCompleted, success, setSuccess, error, setError};
  const pagesGoalProps = {config, year, pageGoal, pagesCompleted, success, setSuccess, error, setError};
  const deleteChallengeProps = {config, year, success, setSuccess};

  return (
    <div className="ReadingChallenges shadow-sm border row mb-5 py-3 px-3">
      <BookGoal {...bookGoalProps}/>
      <PagesGoal {...pagesGoalProps}/>
      <DeleteChallenge {...deleteChallengeProps}/>
  </div>
  );
}

export default ChallengeCard;
