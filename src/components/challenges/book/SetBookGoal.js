import React from "react";

function SetBookGoal(setBookGoalProps) {
  // Props
  const {year, booksToRead, setBooksToRead} = setBookGoalProps;

  return (
    <div className="SetBookGoal col">
      <h4 className="mb-3">{year} Book Goal</h4>
      <div>
        <p>How many books do you want to read in {year}?</p>
        <div>
          <input required className="p-1 text-center" type="number" placeholder={booksToRead} min="1" max="10000" value={booksToRead} onChange={(e) => setBooksToRead(e.target.value)}></input>
        </div>
      </div>
    </div>
  );
}

export default SetBookGoal;
