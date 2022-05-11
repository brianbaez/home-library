import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

// Components
import EditPagesGoal from "./EditPagesGoal";

function PagesGoal(pagesGoalProps) {
  // Props
  const {config, year, pageGoal, pagesCompleted, success, setSuccess, error, setError} = pagesGoalProps;

  const [pagesProgress, setPagesProgress] = useState("0");
  const [pagesNeeded, setPagesNeeded] = useState("0");
  const [scheduleStatus, setScheduleStatus] = useState("");
  const [progressPercentage, setProgressPercentage] = useState("0");

  useEffect(() => {
    // Get pages goal's progress and determine how on schedule the user is
    const getPagesProgress = () => {
      const pagesPerMonth = pageGoal / 12;
      const currentMonth = new Date().getMonth();
      const pagesNeededSoFar = Math.floor(pagesPerMonth * currentMonth);
      const pagesProgress = pagesNeededSoFar - pagesCompleted;

      setPagesProgress(pagesProgress);

      if(pagesProgress < 0) {
        if(pagesCompleted < pageGoal) {
          var unit = (Math.abs(pagesCompleted) === 1) ? "page" : "pages";
          setScheduleStatus(`You are ${Math.abs(pagesProgress).toLocaleString()} ${unit} ahead of schedule!`);
        }
        else if(pagesCompleted > pageGoal) {
          const pagesExceeded = pagesCompleted - pageGoal;
          var unit = (pagesExceeded === 1) ? "page" : "pages";
          setScheduleStatus(`You have exceeded your goal by ${pagesExceeded.toLocaleString()} ${unit}!`);
        }
        else {
          setScheduleStatus("You have met your goal!");
        }
      }
      else if(pagesProgress > 0) {
        var unit = (pagesProgress === 1) ? "page" : "pages";
        setScheduleStatus(`You are ${pagesProgress.toLocaleString()} ${unit} behind schedule.`);
      }
      else {
        setScheduleStatus("You are on track to reaching your goal!");
      }
    }

    // Get user's progress for the pages goal
    const getProgressPercentage = () => {
      if(pagesCompleted <= pageGoal) {
        setProgressPercentage(Math.round((pagesCompleted / pageGoal) * 100));
      }
      else {
        setProgressPercentage("100");
      }
    }

    getPagesProgress();
    getProgressPercentage();
  }, [success]);

  return (
    <div className="PagesGoal col text-center ">
      <h4 className="mb-3">{year} Pages Goal</h4>
      <div className="mb-3"><span className="fw-bold">{pageGoal.toLocaleString()}</span> {(pageGoal === 1) ? <span>page</span> : <span>pages</span>}</div>
      <div className="progress mb-3">
        <div className="progress-bar" role="progresbar" style={{width: `${progressPercentage}%`}} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <div className="mb-3">
        <span>You {(year === new Date().getFullYear()) ? <span>have</span> : <span></span>} read&nbsp;
          <span className="fw-bold">{pagesCompleted.toLocaleString()} {(pagesCompleted === 1) ? <span>page</span> : <span>pages</span>}&nbsp;</span>
        </span>
        <span>({progressPercentage}%)</span>
      </div>
      {(year === new Date().getFullYear()) &&
        <div>
          <div className="mb-3">
            <p className="m-0">{scheduleStatus}</p>
          </div>
          <EditPagesGoal config={config} year={year} pageGoal={pageGoal} success={success} setSuccess={setSuccess} error={error} setError={setError}/>
        </div>
      }
  </div>
  )
}

export default PagesGoal;
