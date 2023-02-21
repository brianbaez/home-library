import React, {useState, useEffect} from "react";
import axiosInstance from "../../../axios";

// Components
import AddEntry from "./add/AddEntry";
import EditEntry from "./edit/EditEntry";

function Entry(entryProps) {
  // Props
  const {config, isbn, entryID} = entryProps;

  const [book, setBook] = useState();
  const [entry, setEntry] = useState();
  
  const [error, setError] = useState();

  const addEntryProps = {config, isbn, book};
  const editEntryProps = {config, isbn, entryID, entry, book};

  useEffect(() => {
    if(isbn) {
      const fetchBook = async () => {
        await axiosInstance.get(`/api/private/books/${isbn}`, config)
        .then((res) => {
          setBook(res.data.data[0].books[0]);
        })
        .catch((error) => {
          setError(error.response);
        });
      }

      fetchBook();
    }
  }, [isbn]);

  useEffect(() => {
    if(book) {
      book.journal.map((entry) => {
        if(entry._id === entryID) {
          setEntry(entry);
        }
      });
    }
  }, [book]);

  return (
    <div className="Entry container my-3">
      {!entryID
        ? <AddEntry {...addEntryProps}/>
        : <EditEntry {...editEntryProps}/>
      }
  </div>
  );
}

export default Entry;
