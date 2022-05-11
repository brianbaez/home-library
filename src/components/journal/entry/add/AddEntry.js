import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

// Components
import Book from "../../Book";
import EntryFields from "../entry-fields/EntryFields";

function AddEntry(addEntryProps) {
  // Props
  const {config, isbn, book} = addEntryProps;

  const navigate = useNavigate();

  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [year, setYear] = useState();
  const [pagesReadSession, setPagesReadSession] = useState();
  const [pagesReadTotal, setPagesReadTotal] = useState();
  const [minTotalPages, setMinTotalPages] = useState();
  const [note, setNote] = useState();

  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const date = new Date();
    setMonth(date.getMonth() + 1);
    setDay(date.getDate());
    setYear(date.getFullYear());
    setPagesReadSession(0);
    setNote("");

    if(book && book.journal.length !== 0) {
      setPagesReadTotal(book.journal[book.journal.length - 1].pagesReadTotal);
    }
    else {
      setPagesReadTotal(0);
    }
  }, [book]);

  useEffect(() => {
    if(book && book.journal.length !== 0) {
      const min = book.journal[book.journal.length - 1].pagesReadTotal;
      setMinTotalPages(min);
    }
    else {
      setMinTotalPages(0);
    }
  }, [book]);

  const addEntryHandler = async (e) => {
    e.preventDefault();

    const data = {
      month: month,
      day: day,
      year: year,
      pagesReadSession: pagesReadSession,
      pagesReadTotal: pagesReadTotal,
      note: note
    };

    // Add journal entry for the book (ISBN)
    const addEntry = async () => {
      return await axios.post(`/api/private/journal/${isbn}`, data, config);
    }

    // Update pages completed for the year
    const updateChallenge = async () => {
      return await axios.put(`/api/private/challenges/${year}`, {pagesCompleted: pagesReadSession}, config);
    }

    await addEntry()
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

  const bookProps = {isbn, book};
  const entryFieldsProps = {handler: addEntryHandler, book, isbn, month, setMonth, day, setDay, year, setYear, pagesReadSession, setPagesReadSession, pagesReadTotal, setPagesReadTotal, minTotalPages, note, setNote, success, error};

  return (
    <div className="AddEntry">
      <h4>Add Journal Entry</h4>
      {book &&
        <div className="AddEntryContent shadow-sm border px-3 py-3">
          <Book {...bookProps}/>
          <EntryFields {...entryFieldsProps}/>
        </div>
      }
    </div>
  );
}

export default AddEntry;
