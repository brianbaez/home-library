import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import BookChallenge from "./book-challenge/BookChallenge";

function Challenges({config}) {
  const [challenges, setChallenges] = useState();
  const [booksProgress, setBooksProgress] = useState("0");
  const [scheduleStatus, setScheduleStatus] = useState("");
  const [progressPercentage, setProgressPercentage] = useState("0");
  const [error, setError] = useState();
  const bookChallengeProps = {challenges, scheduleStatus, progressPercentage};

  useEffect(() => {
    const fetchChallenges = async () => {
      const year = new Date().getFullYear();

      await axios.get(`/api/private/challenges/${year}`, config)
      .then((res) => {
        setChallenges(res.data.data[0].challenges);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    }

    fetchChallenges();
  }, []);

  useEffect(() => {
    if(challenges) {
      const setBooksProgressState = () => {
        const booksPerMonth = challenges.bookGoal / 12;
        const currentMonth = new Date().getMonth();
        const booksNeededSoFar = Math.floor(booksPerMonth * currentMonth);
        const booksProgress = booksNeededSoFar - challenges.booksCompleted;

        setBooksProgress(booksProgress);

        if(challenges.booksCompleted <= challenges.bookGoal) {
          setProgressPercentage(Math.round(challenges.booksCompleted / challenges.bookGoal * 100));
        }
        else {
          setProgressPercentage("100");
        }

        if(booksProgress < 0) {
          const booksCompleted = challenges.booksCompleted;
          const bookGoal = challenges.bookGoal;

          if(booksCompleted < bookGoal) {
            var unit = (Math.abs(booksProgress) === 1) ? "book" : "books";
            setScheduleStatus(`${Math.abs(booksProgress)} ${unit} ahead of schedule`);
          }
          else if(booksCompleted > bookGoal) {
            const booksExceeded = booksCompleted - bookGoal;
            var unit = (booksExceeded === 1) ? "book" : "books";
            setScheduleStatus(`You have exceeded your goal by ${booksExceeded} ${unit}!`);
          }
          else {
            setScheduleStatus("You have met your goal!");
          }
        }
        else if(booksProgress > 0) {
          var unit = (booksProgress === 1) ? "book" : "books";
          setScheduleStatus(`${booksProgress} ${unit} behind schedule`);
        }
        else {
          setScheduleStatus("You are on track to reaching your goal!");
        }
      }

      setBooksProgressState();
    }
  }, [challenges])

  return (
    <div className="Challenges col mb-3">
      <h4>{new Date().getFullYear()} Reading Challenge</h4>
      <div className="ChallengesContent shadow-sm border p-3">
        {!challenges
          ? <span>{error}</span>
          : <BookChallenge {...bookChallengeProps}/>
        }
      </div>
    </div>
  );
}

export default Challenges;
