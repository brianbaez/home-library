import React, {useState, useEffect} from "react";
import axiosInstance from "../../../axios";

function EditBookGoal(props) {
  // Props
  const {config, year, bookGoal, success, setSuccess, error, setError} = props;

  const [booksToRead, setBooksToRead] = useState("0");
  const [currentBookGoal, setCurrentBookGoal] = useState("0");

  useEffect(() => {
    setCurrentBookGoal(bookGoal);
    setBooksToRead(bookGoal);
  }, []);

  const editBookGoalHandler = async (e) => {
    e.preventDefault();

    // Edit book goal for the year
    await axiosInstance.put(`api/private/challenges/${year}`, {bookGoal: booksToRead}, config)
    .then((res) => {
      setSuccess(res.data.message);

      setTimeout(() => {
        setSuccess();
      }, 5000);
    })
    .catch((error) => {
      setError(error.response.data.error);

      setTimeout(() => {
        setError();
      }, 5000);
    })
  }

  return (
    <div className="EditBookGoal">
      <button type="button" className="btn btn-sm mb-0" data-bs-toggle="collapse" data-bs-target={`#edit${year}BookGoal`} aria-expanded="false" aria-controls={`edit${year}BookGoal`}>Edit</button>
      <form className="collapse mt-3" id={`edit${year}BookGoal`} onSubmit={editBookGoalHandler}>
        <div className="form-group d-flex flex-column">
          <p>How many books do you want to read in {year}?</p>
          <div>
            <input required className="p-1 text-center" type="number" placeholder={currentBookGoal} min="1" max="10000" value={booksToRead} onChange={(e) => setBooksToRead(e.target.value)}></input>
          </div>
          <div className="mt-3">
            <button className="btn btn-sm" type="submit">Update Book Goal</button>
          </div>
          {success && <span className="mt-1">{success}</span>}
          {error && <span className="mt-1">{error}</span>}
        </div>
      </form>
    </div>
  );
}

export default EditBookGoal;
