import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

// Components
import Book from "../../Book";
import EntryFields from "../entry-fields/EntryFields";

function EditEntry(editEntryProps) {
  // Props
  const {config, isbn, entryID, entry, book} = editEntryProps

  const navigate = useNavigate();

  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [year, setYear] = useState();
  const [pagesReadSession, setPagesReadSession] = useState();
  const [pagesReadTotal, setPagesReadTotal] = useState();
  const [maxTotalPages, setMaxTotalPages] = useState();
  const [note, setNote] = useState();

  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if(entry) {
      setMonth(entry.date.month);
      setDay(entry.date.day);
      setYear(entry.date.year);
      setPagesReadSession(entry.pagesReadSession);
      setPagesReadTotal(entry.pagesReadTotal);
      setNote(entry.note);
    }
  }, [entry]);

  useEffect(() => {
    if(pagesReadSession && pagesReadTotal) {
      const max = Number(entry.pagesReadTotal-entry.pagesReadSession) + Number(pagesReadSession);
      setMaxTotalPages(max);
    }
  }, [pagesReadSession, pagesReadTotal]);

  const editEntryHandler = async (e) => {
    e.preventDefault();
    const data = {
      month: month,
      day: day,
      year: year,
      pagesReadSession: pagesReadSession,
      pagesReadTotal: pagesReadTotal,
      note: note
    };

    const editEntry = async () => {
      return await axios.put(`/api/private/journal/${isbn}/${entryID}`, data, config);
    }

    const updateChallenge = async () => {
      const updatedPagesCompleted = Number(pagesReadSession) - Number(entry.pagesReadSession);
      return await axios.put(`/api/private/challenges/${year}`, {pagesCompleted: updatedPagesCompleted}, config);
    }

    await editEntry()
    .then((res) => {
      setSuccess(res.data.message);

      setTimeout(() => {
        setSuccess();
        navigate(`/journal/${isbn}`);
      }, 5000);
    })
    .catch((error) => {
      setError(error.response.data.error);
    });

    await updateChallenge()
    .then((res) => {})
    .catch((error) => {});
  }

  const deleteEntryHandler = async (e) => {
    e.preventDefault();

    if(window.confirm("Are you sure you want to delete this journal entry?")) {
      const deleteEntry = async () => {
        return await axios.delete(`/api/private/journal/${isbn}/${entryID}`, config);
      }

      const updateChallenge = async () => {
        return await axios.put(`/api/private/challenges/${year}`, {pagesCompleted: -(entry.pagesReadSession)}, config);
      }

      await deleteEntry()
      .then((res) => {
        navigate(`/journal/${isbn}`);
      })
      .catch((error) => {});

      await updateChallenge()
      .then((res) => {
      })
      .catch((error) => {});
    }
  }

  const bookProps = {isbn, book};
  const entryFieldsProps = {handler: editEntryHandler, deleteHandler: deleteEntryHandler, book, entry, month, setMonth, day, setDay, year, setYear, pagesReadSession, setPagesReadSession, pagesReadTotal, setPagesReadTotal, note, setNote, success, error};

  return (
    <div className="EditEntry">
      <h4>Edit Journal Entry</h4>
      <div className="EditEntry shadow-sm border px-3 py-3">
        {!entry && <span>Entry not found</span>}
        {entry &&
          <div>
            {book && <Book {...bookProps}/>}
            <EntryFields {...entryFieldsProps}/>
          </div>
        }
      </div>
    </div>
  );
}

export default EditEntry;
