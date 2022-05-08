import React from "react";

// Component
import ChallengeCard from "./ChallengeCard";

function ReadingChallengeCards(readingChallengeCardsProps) {
  // Props
  const {config, challenges, success, setSuccess, error, setError} = readingChallengeCardsProps;

  const challengeCardProps = {config, success, setSuccess, error, setError};

  return (
    <div className="ReadingChallengeCards">
      {challenges &&
        <div>
          {challenges.map((challenge) => {
            return (
              <div className={`${challenge.year}Challenge text-center`}>
                <h4>{challenge.year} Reading Challenges</h4>
                <ChallengeCard challengeCardProps={challengeCardProps} challenge={challenge} />
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

export default ReadingChallengeCards;
