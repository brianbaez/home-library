import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import CurrentlyReadingBooks from "./CurrentlyReadingBooks";
import ViewAllButton from "../ViewAllButton";
import BookCard from "./BookCard";

function CurrentlyReading({config}) {
  const [currentlyReading, setCurrentlyReading] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const currentlyReadingBooksProps = {config, currentlyReading, success, setSuccess, error, setError};

  useEffect(() => {
    const fetchCurrentlyReading = async () => {
      await axios.get(`/api/private/bookshelves/books/currently-reading`, config)
      .then((res) => {
        setCurrentlyReading(res.data.data[0].books)
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    }

    fetchCurrentlyReading();
  }, [success]);

  return (
    <div className="CurrentlyReading col mb-3">
      <h4>Curently Reading</h4>
      <div className="CurrentlyReadingContent shadow-sm border p-3">
        {!currentlyReading
          ? <span>{error}</span>
          : <CurrentlyReadingBooks {...currentlyReadingBooksProps}/>
        }
      </div>
    </div>
  );
}

export default CurrentlyReading;