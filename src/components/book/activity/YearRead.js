import React, {useState, useEffect} from "react";
import axiosInstance from "../../../axios";

function YearRead(yearReadProps) {
  // Props
  const {config, isbn, yearRead, setYearRead, success, setSuccess, error, setError} = yearReadProps;

  const [updatedYearRead, setUpdatedYearRead] = useState();

  const years = [];
  for(var i = new Date().getFullYear(); i >= 1932; i--) {
    years.push(i);
  }

  const updateYearReadHandler = async (e) => {
    e.preventDefault();

    if(updatedYearRead === undefined || updatedYearRead == yearRead) {
      setError("Failed to update");

      setTimeout(() => {
        setError();
      }, 5000);
    }
    else {
      // Update year read
      const updateYear = async () => {
        return await axiosInstance.put(`/api/private/books/${isbn}`, {yearRead: updatedYearRead}, config)
      }

      // Decrement books completed for the year
      const decrementChallenge = async () => {
        return await axiosInstance.put(`/api/private/challenges/${yearRead}`, {booksCompleted: -1}, config)
      }

      // Increment books completed for the year
      const incrementChallenge = async () => {
        return await axiosInstance.put(`/api/private/challenges/${updatedYearRead}`, {booksCompleted: 1}, config)
      }

      await updateYear()
      .then((res) => {
        setYearRead(updatedYearRead);
        setSuccess("Year read has been updated");

        setTimeout(() => {
          setSuccess();
        }, 5000);
      })
      .catch((error) => {});

      await decrementChallenge()
      .then((res) => {})
      .catch((error) => {});

      await incrementChallenge()
      .then((res) => {})
      .catch((error) => {});
    }
  }

  const deleteYearReadHandler = async (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to delete the year this book was read?")) {
      // Delete year read
      await axiosInstance.put(`/api/private/books/${isbn}`, {yearRead: -1}, config)
      .then((res) => {
        setYearRead();
        setSuccess("Year read has been deleted");

        setTimeout(() => {
          setSuccess();
        }, 5000);
      })
      .catch((error) => {});
    }
  }

  return (
    <div className="YearRead">
      {!yearRead && <p>You have not told us when you read this book.</p>}
      {yearRead &&
        <div className="d-flex align-items-center">
          <p className="m-0">You read this book in {yearRead}</p>
          <button type="button" className="btn-close ms-2" style={{fontSize: "0.75rem"}} onClick={deleteYearReadHandler}></button>
        </div>
      }
      <form className="YearRead mt-3 d-flex align-items-center" onSubmit={updateYearReadHandler}>
        <span className="me-3">When did you read this book?</span>
        <div>
          <select className="form-select text-center" value={updatedYearRead} onChange={(e) => setUpdatedYearRead(e.target.value)}>
            {!yearRead ? <option hidden selected value>Select a year</option> : <option disabled selected value>{yearRead}</option>}
            {years.map((year) => {
              return (
                <option value={year}>{year}</option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-sm ms-3" type="submit">Update</button>
        {error && <span className="ms-3">{error}</span>}
        {success && <span className="ms-3">{success}</span>}
      </form>
    </div>
  );
}

export default YearRead;
