import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

// Components
import DefaultBookshelves from "./DefaultBookshelves";
import CustomBookshelves from "./CustomBookshelves";

function Bookshelves(bookshelvesProps) {
  // Props
  const {config, setBooks, deletedBook, setDeletedBook, setError, deletedBookshelf} = bookshelvesProps;

  const {bookshelfParam} = useParams();
  const [bookshelf, setBookshelf] = useState(bookshelfParam || "");

  useEffect(() => {
    const fetchResults = async () => {
      if(bookshelf === "") {
        await axios.get(`/api/private/books`, config)
        .then((res) => {
          setBooks(res.data.data[0].books);
          setDeletedBook(false);
          setError();
        })
        .catch((error) => {
          setBooks([]);
          setError(error.response.data.error);
        });
      }
      else {
        await axios.get(`/api/private/bookshelves/books/${bookshelf}`, config)
        .then((res) => {
          setBooks(res.data.data[0].books);
          setDeletedBook(false);
          setError();
        })
        .catch((error) => {
          setBooks([]);
          setError(error.response.data.error);
        });
      }
    }

    fetchResults();
  }, [bookshelf, deletedBook]);

  const customBookshelvesProps = {config, setBookshelf, deletedBookshelf};

  return (
    <div className="Bookshelves col col-3 d-none-sm d-block-lg">
      <h5>Bookshelves</h5>
      <DefaultBookshelves setBookshelf={setBookshelf}/>
      <CustomBookshelves {...customBookshelvesProps}/>
    </div>
  );
}

export default Bookshelves;
