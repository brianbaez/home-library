import React from "react";

function Year(yearProps) {
  // Props
  const {year, setYear} = yearProps;

  return (
    <select className="Year form-select text-center w-auto" value={year} onChange={(e) => setYear(e.target.value)}>
      <option disabled selected>{year}</option>
      {Array.from(Array(80), (e, index) => {
        return (
          <option value={year - index}>{year - index}</option>
        );
      })}
    </select>
  );
}

export default Year;
