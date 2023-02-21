import React, {useState, useEffect} from "react";
import axiosInstance from "../../../axios";

function EditPagesGoal(props) {
  // Props
  const {config, year, pageGoal, success, setSuccess, error, setError} = props;

  const [pagesToRead, setPagesToRead] = useState("0");
  const [currentPagesGoal, setCurrentPagesGoal] = useState("0");

  useEffect(() => {
    setCurrentPagesGoal(pageGoal);
    setPagesToRead(pageGoal);
  }, []);

  const editPagesGoalHandler = async (e) => {
    e.preventDefault();

    // Edit pages goal for the year
    await axiosInstance.put(`/api/private/challenges/${year}`, {pageGoal: pagesToRead}, config)
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
    <div className="EditPagesGoal">
      <button type="button" className="btn btn-sm mb-0" data-bs-toggle="collapse" data-bs-target={`#edit${year}PagesGoal`} aria-expanded="false" aria-controls={`edit${year}PagesGoal`}>Edit</button>
      <form className="collapse mt-3" id={`edit${year}PagesGoal`} onSubmit={editPagesGoalHandler}>
        <div className="form-group d-flex flex-column">
          <p>How many pages do you want to read in {year}?</p>
          <div>
            <input required className="p-1 text-center" type="number" placeholder={currentPagesGoal} min="1" max="1000000" value={pagesToRead} onChange={(e) => setPagesToRead(e.target.value)}></input>
          </div>
          <div className="mt-3">
            <button className="btn btn-sm" type="submit">Update Pages Goal</button>
          </div>
          {success && <span className="mt-1">{success}</span>}
          {error && <span className="mt-1">{error}</span>}
        </div>
      </form>
    </div>
  )
}

export default EditPagesGoal;
