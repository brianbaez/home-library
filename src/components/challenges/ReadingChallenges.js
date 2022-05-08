import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import SetReadingChallenges from "./SetReadingChallenges";
import ReadingChallengeCards from "./ReadingChallengeCards";

function ReadingChallenges({config}) {
  const [currentYearChallenge, setCurrentYearChallenge] = useState(false);
  const [challenges, setChallenges] = useState();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState();

  const setReadingChallengesProps = {config, success, setSuccess, error, setError};
  const readingChallengeCardsProps = {config, challenges, success, setSuccess, error, setError};


  useEffect(() => {
    const getChallenges = async () => {
      await axios.get(`/api/private/challenges`, config)
      .then((res) => {
        setChallenges(res.data.data[0].challenges);
      })
      .catch((error) => {
        setError(error.response.data.error);
      })
    }

    getChallenges();
  }, [success]);

  useEffect(() => {
    if(challenges) {
      challenges.map((challenge) => {
        if(challenge.year === new Date().getFullYear()) {
          setCurrentYearChallenge(true);
        }
      })
    }
  }, [challenges])

  return (
    <div className="ReadingChallenges container my-3">
      {!currentYearChallenge && <SetReadingChallenges {...setReadingChallengesProps}/>}
      {challenges && <ReadingChallengeCards {...readingChallengeCardsProps}/>}
    </div>
  );
}

export default ReadingChallenges;
