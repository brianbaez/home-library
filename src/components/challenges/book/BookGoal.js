import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

// Components
import EditBookGoal from "./EditBookGoal";

function BookGoal(bookGoalProps) {
  // Props
  const {config, year, bookGoal, booksCompleted, success, setSuccess, error, setError} = bookGoalProps;

  const [booksProgress, setBooksProgress] = useState("0");
  const [booksNeeded, setBooksNeeded] = useState("0");
  const [scheduleStatus, setScheduleStatus] = useState("");
  const [progressPercentage, setProgressPercentage] = useState("0");

  useEffect(() => {
    const getBooksProgress = () => {
      const booksPerMonth = bookGoal / 12;
      const currentMonth = new Date().getMonth();
      const booksNeededSoFar = Math.floor(booksPerMonth * currentMonth);
      const booksProgress = booksNeededSoFar - booksCompleted;

      setBooksProgress(booksProgress);

      if(booksProgress < 0) {
        if(booksCompleted < bookGoal) {
          var unit = (Math.abs(booksProgress) === 1) ? "book" : "books";
          setScheduleStatus(`You are ${Math.abs(booksProgress).toLocaleString()} ${unit} ahead of schedule!`);
        }
        else if(booksCompleted > bookGoal) {
          const booksExceeded = booksCompleted - bookGoal;
          var unit = (booksExceeded === 1) ? "book" : "books";
          setScheduleStatus(`You have exceeded your goal by ${booksExceeded.toLocaleString()} ${unit}!`);
        }
        else {
          setScheduleStatus("You have met your goal!");
        }
      }
      else if(booksProgress > 0) {
        var unit = (booksProgress === 1) ? "book" : "books";
        setScheduleStatus(`You are ${booksProgress.toLocaleString()} ${unit} behind schedule.`);
      }
      else {
        setScheduleStatus("You are on track to reaching your goal!");
      }
    }

    const getProgressPercentage = () => {
      if(booksCompleted <= bookGoal) {
        setProgressPercentage(Math.round(booksCompleted / bookGoal * 100));
      }
      else {
        setProgressPercentage("100");
      }
    }

    getBooksProgress();
    getProgressPercentage();
  }, [success]);

  return (
    <div className="BookGoal col text-center mb-5 mb-lg-0">
      <h4 className="mb-3">{year} Book Goal</h4>
      <div className="mb-3"><span className="fw-bold">{bookGoal.toLocaleString()}</span> {(bookGoal === 1) ? <span>book</span> : <span>books</span>}</div>
      <div className="progress mb-3">
        <div className="progress-bar" role="progresbar" style={{width: `${progressPercentage}%`}} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <div className="mb-3">
        <span>You {(year === new Date().getFullYear()) ? <span>have</span> : <span></span>} read&nbsp;
          <Link to={`/my-books/${year}-reads`}>
            <span className="fw-bold">{booksCompleted.toLocaleString()} {(booksCompleted === 1) ? <span>book</span> : <span>books</span>}&nbsp;</span>
          </Link>
        </span>
        <span>({progressPercentage}%)</span>
      </div>
      {(year === new Date().getFullYear()) &&
        <div>
          <div className="mb-3">
            <p className="m-0">{scheduleStatus}</p>
          </div>
          <EditBookGoal {...bookGoalProps}/>
        </div>
      }
    </div>
  );
}

export default BookGoal;
