import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axiosInstance from "../../../axios";

// Components
import DefaultBookshelves from "./DefaultBookshelves";
import CustomBookshelves from "./CustomBookshelves";
import BookshelvesDropdown from "./BookshelvesDropdown";

function Bookshelves(bookshelvesProps) {
  // Props
  const {config, setBooksLoading, setBooks, deletedBook, setDeletedBook, setError, deletedBookshelf} = bookshelvesProps;

  const {bookshelfParam} = useParams();

  const [bookshelf, setBookshelf] = useState(bookshelfParam || "");
  const [customBookshelves, setCustomBookshelves] = useState([]);

  const [bookshelvesLoading, setBookshelvesLoading] = useState(true);

  const customBookshelvesProps = {config, setBooksLoading, setBookshelf, deletedBookshelf, customBookshelves, setCustomBookshelves};

  useEffect(() => {
    const fetchResults = async () => {
      if(bookshelf === "") {
        // Get all books
        await axiosInstance.get(`/api/private/books`, config)
        .then((res) => {
          if(res.data.data.length !== 0) {
            setBooks(res.data.data[0].books);
          }

          setDeletedBook(false);
          setBookshelvesLoading(false);
          setBooksLoading(false);
          setError();
        })
        .catch((error) => {
          setBooks([]);
          console.log(error);
          setError(error?.response?.data?.error);
          setBookshelvesLoading(false);
          setBooksLoading(false);
        });
      }
      else {
        // Get books in the bookshelf
        await axiosInstance.get(`/api/private/bookshelves/books/${bookshelf}`, config)
        .then((res) => {
          setBooks(res.data.data[0].books);
          setDeletedBook(false);
          setBookshelvesLoading(false);
          setBooksLoading(false);
          setError();
        })
        .catch((error) => {
          setBooks([]);
          setError(error.response.data.error);
          setBookshelvesLoading(false);
          setBooksLoading(false);
        });
      }
    }

    fetchResults();
  }, [bookshelf, deletedBook]);

  if(!bookshelvesLoading) {
    return (
      <div className="Bookshelves col col-12 col-lg-3">
        <div className="d-none d-lg-block">
          <h5>Bookshelves</h5>
          <DefaultBookshelves setBookshelf={setBookshelf} setBooksLoading={setBooksLoading}/>
          <CustomBookshelves {...customBookshelvesProps}/>
        </div>

        <div className="d-block d-lg-none mb-3">
          <h5>Bookshelves</h5>
          <BookshelvesDropdown customBookshelves={customBookshelves} setBookshelf={setBookshelf} setBooksLoading={setBooksLoading}/>
        </div>
      </div>
    );
  }
}

export default Bookshelves;
