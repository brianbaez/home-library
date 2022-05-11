import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

// Components
import Book from "./Book";
import JournalEntries from "./JournalEntries";

function Journal(journalProps) {
  // Props
  const {config, isbn} = journalProps;

  const [book, setBook] = useState();
  const [journal, setJournal] = useState();

  const [error, setError] = useState();

  const [journalLoading, setJournalLoading] = useState(true);

  const bookProps = {isbn, book, journal};
  const journalEntriesProps = {isbn, book, journal, error};

  useEffect(() => {
    if(isbn) {
      const fetchBook = async () => {
        await axios.get(`/api/private/books/${isbn}`, config)
        .then((res) => {
          setBook(res.data.data[0].books[0]);
        })
        .catch((error) => {
          setError(error.response.data.error);
        });
      }

      fetchBook();
    }
  }, [isbn]);

  useEffect(() => {
    // Get journal for the book
    const fetchJournal = async () => {
      await axios.get(`/api/private/journal/${isbn}`, config)
      .then((res) => {
        if(res.data.journal.length !== 0) {
          setJournal(res.data.journal[0].entries);
          setJournalLoading(false);
        }
        else {
          setJournalLoading(false);
          setError("There are no journal entries for this book");
        }
      })
      .catch((error) => {
        setJournalLoading(false);
        setError(error.response.data.error);
      })
    }

    fetchJournal();
  }, [book]);

  if(!journalLoading) {
    return (
      <div className="Journal container my-3">
        <h4>Reading Journal</h4>
        <div className="JournalContent shadow-sm border p-3">
          {!book && error && <span>{error}</span>}
          {book &&
            <div>
              <Book {...bookProps}/>
              <JournalEntries {...journalEntriesProps}/>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Journal;
