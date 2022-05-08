import React from "react";

function Month(monthProps) {
  // Props
  const {month, setMonth} = monthProps;

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "Decemeber"];

  return (
    <select className="Month form-select text-center me-2 w-auto" value={month} onChange={(e) => setMonth(e.target.value)}>
      <option disabled selected>{monthNames[month - 1]}</option>
      {monthNames.map((month, index) => {
        return (
          <option value={index + 1}>{month}</option>
        );
      })}
    </select>
  );
}

export default Month;
