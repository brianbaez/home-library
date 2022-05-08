import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

function EntryCard(entryCardProps) {
  // Props
  const {entry, isbn, pages} = entryCardProps;

  const [progressPercentage, setProgressPercentage] = useState();

  useEffect(() => {
    setProgressPercentage(Math.round((entry.pagesReadTotal / pages) * 100));
  }, []);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemebr", "Decemebr"];

  return (
    <div className="EntryCard">
      <div className="EntryInfo d-flex align-items-center">
        <h5 className="mb-0">{monthNames[entry.date.month - 1]} {entry.date.day}, {entry.date.year}</h5>
        <Link to={`/journal/${isbn}/edit/${entry._id}`}>
          <button className=" ms-3 btn btn-sm">Edit</button>
        </Link>
      </div>
      <div className="EntryStats mt-3">
        <div className="ProgressBar d-flex align-items-center">
          <div className="progress w-25 me-2">
            <div className="progress-bar" role="progressbar" style={{width: `${progressPercentage}%`}} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div>
            <span>{entry.pagesReadTotal}/{pages} ({progressPercentage}%)</span>
          </div>
        </div>
        <p>You read {entry.pagesReadSession} {(entry.pagesReadSession === 1) ? <span>page</span> : <span>pages</span>} for this reading session.</p>
      </div>
      <hr className="my-3"></hr>
    </div>
  );
}

export default EntryCard;
