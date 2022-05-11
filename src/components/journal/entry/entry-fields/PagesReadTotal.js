import React from "react";

function PagesReadTotal(pagesReadTotalProps) {
  // Props
  const {minTotalPages, maxTotalPages, pagesReadTotal, setPagesReadTotal} = pagesReadTotalProps;

  return (
    <div className="PagesReadTotal mt-3">
      <p className="mb-1">How many pages have you read in total?</p>
      <input required className="text-center p-1" type="number" min={minTotalPages || "0"} max={maxTotalPages} value={pagesReadTotal} onChange={(e) => setPagesReadTotal(e.target.value)}></input>
    </div>
  );
}

export default PagesReadTotal;
