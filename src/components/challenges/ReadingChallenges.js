import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import SetReadingChallenges from "./SetReadingChallenges";
import ReadingChallengeCards from "./ReadingChallengeCards";

function ReadingChallenges({config}) {
  const [currentYearChallenge, setCurrentYearChallenge] = useState();
  const [challenges, setChallenges] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const [challengesLoading, setChallengesLoading] = useState(true);

  const setReadingChallengesProps = {config, success, setSuccess, error, setError};
  const readingChallengeCardsProps = {config, challenges, success, setSuccess, error, setError};


  useEffect(() => {
    // Get all reading challenges for the user
    const getChallenges = async () => {
      await axios.get(`/api/private/challenges`, config)
      .then((res) => {
        const data = res.data.data;

        if(data.length !== 0) {
          setChallenges(data[0].challenges);
          setChallengesLoading(false);
        }
        else {
          setChallenges();
          setChallengesLoading(false);
        }
      })
      .catch((error) => {});
    }

    getChallenges();
  }, [success]);

  // Check if current year's challenge is set
  useEffect(() => {
    setCurrentYearChallenge(false);

    if(challenges) {
      challenges.map((challenge) => {
        if(challenge.year === new Date().getFullYear()) {
          setCurrentYearChallenge(true);
        }
      });
    }
  }, [challenges]);

  if(!challengesLoading) {
    return (
      <div className="ReadingChallenges container my-3">
        {!currentYearChallenge && <SetReadingChallenges {...setReadingChallengesProps}/>}
        {challenges && <ReadingChallengeCards {...readingChallengeCardsProps}/>}
      </div>
    );
  }
}

export default ReadingChallenges;
