import React, {useState} from "react";
import axios from "axios";

// Components
import SetBookGoal from "./SetBookGoal";
import SetPagesGoal from "./SetPagesGoal";

function SetReadingChallenges(setReadingChallengesProps) {
  // Props
  const {config, success, setSuccess, error, setError} = setReadingChallengesProps;

  const [booksToRead, setBooksToRead] = useState("1");
  const [pagesToRead, setPagesToRead] = useState("1");
  const year = new Date().getFullYear();

  const setBookGoalProps = {year, booksToRead, setBooksToRead};
  const setPagesGoalProps = {year, pagesToRead, setPagesToRead};

  const addChallengeHandler = async (e) => {
    e.preventDefault();

    const data = {
      bookGoal: booksToRead,
      pageGoal: pagesToRead
    }

    await axios.post(`/api/private/challenges/${year}`, data, config)
    .then((res) => {
      setSuccess(res.data.message);

      setTimeout(() => {
        setSuccess();
      }, 5000);
    })
    .catch((error) => {
      setError(error.response.data.error);

      setTimeout((error) => {
        setError();
      }, 5000);
    });
  }

  return (
    <div className="SetReadingChallenges text-center shadow-sm border row mb-5 py-3 px-3">
      <h4>Set Up Your {year} Reading Challenges</h4>
      <SetBookGoal {...setBookGoalProps}/>
      <SetPagesGoal {...setPagesGoalProps}/>

      <form className="mt-3" onSubmit={addChallengeHandler}>
        <button className="btn btn-sm" type="submit">Add Challenge</button>
      </form>

      {success && <span className="mt-1">{success}</span>}
      {error && <span className="mt-1">{error}</span>}
    </div>
  );
}

export default SetReadingChallenges;
