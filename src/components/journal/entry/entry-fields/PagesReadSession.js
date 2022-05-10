import React from "react";

function PagesReadSession(pagesReadSessionProps) {
  // Props
  const {minTotalPages, maxPages, pagesReadSession, setPagesReadSession} = pagesReadSessionProps;
  const maxPagesSession = maxPages - minTotalPages;

  return (
    <div className="PagesReadSession mt-3">
      <h4>How many pages did you read for this session?</h4>
      <input required className="text-center p-1" type="number" min="0" max={minTotalPages ? maxPagesSession.toString() : maxPages} value={pagesReadSession} onChange={(e) => setPagesReadSession(e.target.value)}></input>
    </div>
  );
}

export default PagesReadSession;
