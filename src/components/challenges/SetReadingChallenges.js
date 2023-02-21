import React, {useState} from "react";
import axiosInstance from "../../axios";

// Components
import SetBookGoal from "./book/SetBookGoal";
import SetPagesGoal from "./pages/SetPagesGoal";

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

    // Add challenge for the year
    await axiosInstance.post(`/api/private/challenges/${year}`, data, config)
    .then((res) => {
      setSuccess(res.data.message);

      setTimeout(() => {
        setSuccess();
      }, 1000);
    })
    .catch((error) => {
      setError(error.response.data.error);

      setTimeout((error) => {
        setError();
      }, 5000);
    });
  }

  return (
    <div className="SetReadingChallenges text-center">
      <h4>Set Up Your {year} Reading Challenges</h4>
      <div className="SetReadingChallengesContent shadow-sm border row mb-5 p-3">
        <SetBookGoal {...setBookGoalProps}/>
        <SetPagesGoal {...setPagesGoalProps}/>

        <form className="mt-3" onSubmit={addChallengeHandler}>
          <button className="btn btn-sm" type="submit">Add Challenge</button>
        </form>
      </div>
    </div>
  );
}

export default SetReadingChallenges;
