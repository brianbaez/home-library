import React from "react";

function SetPagesGoal(setPagesGoalProps) {
  // Props
  const {year, pagesToRead, setPagesToRead} = setPagesGoalProps;

  return (
    <div className="SetPagesGoal col">
      <h4 className="mb-3">{year} Pages Goal</h4>
      <div>
        <p>How many pages do you want to read in {year}?</p>
        <div>
          <input required className="p-1 text-center" type="number" placeholder={pagesToRead} min="1" max="1000000" value={pagesToRead} onChange={(e) => setPagesToRead(e.target.value)}></input>
        </div>
      </div>
    </div>
  );
}

export default SetPagesGoal;
