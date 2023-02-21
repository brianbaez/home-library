import React, {useState, useEffect} from "react";
import axiosInstance from "../../../axios";

// Components
import SaveButton from "../../SaveButton";

function BookProgress(bookProgressProps) {
  // Props
  const {config, isbn, pages, journal, success, setSuccess, error, setError} = bookProgressProps;

  const [progressPages, setProgressPages] = useState("0");
  const [progressPercentage, setProgressPercentage] = useState("0");
  const [currentPage, setCurrentPage] = useState("");
  const [pagesRead, setPagesRead] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    // Get progress for the book
    if(journal.length !== 0) {
      setProgressPages(journal[journal.length - 1].pagesReadTotal);
      setProgressPercentage(Math.round((journal[journal.length - 1].pagesReadTotal / pages) * 100));
    }
  }, [success]);

  const updateProgressHandler = async (e) => {
    e.preventDefault();

    const pagesRead = currentPage - progressPages;
    setPagesRead(pagesRead);

    const date = new Date();

    const data = {
      "month": date.getMonth() + 1,
      "day": date.getDate(),
      "year": date.getFullYear(),
      "pagesReadSession": pagesRead,
      "note": note
    }

    // Add journal entry for the book (ISBN)
    const addEntry = async () => {
      return await axiosInstance.post(`/api/private/journal/${isbn}`, data, config);
    }

    // Update pages completed for the year
    const updateChallenge = async () => {
      return await axiosInstance.put(`/api/private/challenges/${date.getFullYear()}`, {pagesCompleted: pagesRead}, config);
    }

    await addEntry()
    .then((res) => {
      setNote("");
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
    });

    await updateChallenge()
    .then((res) => {})
    .catch((error) => {});
  }

  return (
    <div className="BookProgress">
      <div className="ProgressBar d-flex align-items-center">
        <div className="progress w-25 me-2">
          <div className="progress-bar" role="progressbar" style={{width: `${progressPercentage}%`}} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div>
          <span>{progressPages}</span>
          <span>/{pages} </span>
          <span>({progressPercentage}%)</span>
        </div>
      </div>

      <div className="UpdateProgress mt-2">
        <button type="button" className="btn btn-sm" data-bs-toggle="collapse" data-bs-target={`#updateProgress-${isbn}`} aria-expanded="false" aria-controls={`updateProgress-${isbn}`}>Update Progress</button>

      <form className="UpdateProgressFields collapse mt-3" id={`updateProgress-${isbn}`} onSubmit={updateProgressHandler}>
          <div className="form-group">
            <div>
              <span>Currently on </span>
              <input required type="number" placeholder={progressPages} min={progressPages} max={pages} value={currentPage} onChange={(e) => setCurrentPage(e.target.value)}></input>
              <span> of {pages}</span>
            </div>
            <div className="mt-2">
              <textarea className="form-control" id="note" placeholder="Add a note" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
            </div>
            <div className="SaveButton d-flex align-items-center mt-2">
              <SaveButton success={success} error={error}/>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}

export default BookProgress;
