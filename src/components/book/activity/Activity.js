import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

// Components
import YearRead from "./YearRead";

function Activity(activityProps) {
  //Props
  const {config, isbn, yearRead1, currentStatus} = activityProps;

  const [yearRead, setYearRead] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const yearReadProps = {config, isbn, yearRead, setYearRead, success, setSuccess, error, setError};

  useEffect(() => {
    const fetchBook = async () => {
      if(isbn) {
        await axios.get(`/api/private/books/${isbn}`, config)
        .then((res) => {
          const yearRead = res.data.data[0].books[0].yearRead;
          if(yearRead !== undefined && yearRead != -1) {
            setYearRead(yearRead);
          }
        })
        .catch((error) => {})
      }
    }

    fetchBook();
  }, [isbn, success]);

  return (
    <div className="Activity">
      {(currentStatus !== "Want to Read") &&
        <div>
          <hr className="mt-3 mb-3"></hr>
          <h4>Activity</h4>
          {(currentStatus === "Read") && <YearRead {...yearReadProps} />}

          <div className="mt-3">
            <Link to={`/journal/${isbn}`}>
              <button className="btn">View Journal Entries</button>
            </Link>
          </div>
        </div>
      }
    </div>
  );
}

export default Activity;
