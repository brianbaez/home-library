import React from "react";

// Components
import Month from "./Month";
import Day from "./Day";
import Year from "./Year";

function Date(dateProps) {
  // Props
  const {month, setMonth, day, setDay, year, setYear} = dateProps;

  const monthProps = {month, setMonth};
  const dayProps = {day, setDay, month};
  const yearProps = {year, setYear};

  return (
    <div className="Date">
      <h4>Date</h4>
      <div className="SelectFields d-flex">
        <Month {...monthProps}/>
        <Day {...dayProps} />
        <Year {...yearProps}/>
      </div>
    </div>
  );
}

export default Date;
