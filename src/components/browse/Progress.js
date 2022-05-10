import React, {useState, useEffect} from "react";
import axios from "axios";

function Progress(progressProps) {
  // Props
  const {config, isbn, pages, currentStatus} = progressProps;

  const [progress, setProgress] = useState(false);
  const [progressPages, setProgressPages] = useState("0");
  const [progressPercentage, setProgressPercentage] = useState("0");
  const [currentPage, setCurrentPage] = useState();
  const [note, setNote] = useState();
  const [pagesRead, setPagesRead] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBook = async () => {
      if(isbn) {
        await axios.get(`/api/private/books/${isbn}`, config)
        .then((res) => {
          const journal = res.data.data[0].books[0].journal;

          setProgress(true);

          if(journal.length !== 0) {
            setProgressPages(journal[journal.length - 1].pagesReadTotal);
          }

          setProgressPercentage(Math.round((journal[journal.length - 1].pagesReadTotal / pages) * 100));
        })
        .catch((error) => {
          setProgress(false);
          // setProgressPages()
          // setProgressPercentage();
        })
      }
    }

    fetchBook();
  }, [isbn, success]);

  const updateProgressHandler = async (e) => {
    e.preventDefault();

    const pagesRead = currentPage - progressPages;

    setPagesRead(pagesRead);

    const data = {
      "month": new Date().getMonth() + 1,
      "day": new Date().getDate(),
      "year": new Date().getFullYear(),
      "pagesReadSession": pagesRead,
      "note": note
    }

    const addEntry = async () => {
      return await axios.post(`/api/private/journal/${isbn}`, data, config);
    }

    const updateChallenge = async () => {
      return await axios.put(`/api/private/challenges/${data.year}`, {pagesCompleted: pagesRead}, config);
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
    <div className="Progress">
      {(currentStatus === "Currently Reading") &&
        <div>
          <hr className="mt-3 mb-3"></hr>
          <h4>Progress</h4>
          <div className="ProgressBar d-flex align-items-center">
            <div class="progress w-25 me-2">
              <div class="progress-bar" role="progressbar" style={{width: `${progressPercentage}%`}} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div>
              <span>{progressPages}</span>
              <span>/{pages} </span>
              <span>({progressPercentage}%)</span>
            </div>
          </div>

          <div className="UpdateProgress mt-2">
            <button type="button" className="btn" data-bs-toggle="collapse" data-bs-target={`#updateProgress-${isbn}`} aria-expanded="false" aria-controls={`updateProgress-${isbn}`}>Update Progress</button>
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
                <div className="d-flex align-items-center mt-2">
                  <button className="btn" type="submit">Save</button>
                  {success && <span className="ms-2">{success}</span>}
                  {error && <span className="ms-2">{error}</span>}
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default Progress;
