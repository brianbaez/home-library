import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

// Components
import BookProgress from "./BookProgress";
import BookCover from "../BookCover";

function BookCard(bookCardProps) {
  // Props
  const {config, book, success, setSuccess, error, setError} = bookCardProps;

  const [isbn, setISBN] = useState();

  const bookCoverProps = {book, isbn};
  const bookProgressProps = {config, isbn, pages: book.pages, journal: book.journal, success, setSuccess, error, setError};

  useEffect(() => {
    // Get ISBN of the book
    if(book) {
      const getISBN13 = () => {
        book.isbn.map((item) => {
          if(item.type === "ISBN_13") {
            setISBN(item.identifier);
          }
        });
      };

      const getISBN10 = () => {
        book.isbn.map((item) => {
          if(item.type === "ISBN_10") {
            setISBN(item.identifier);
          }
        });
      };

      getISBN13();

      // If book did not have an ISBN13
      if(isbn === undefined) {
        getISBN10();
      }
    }
  }, [book]);

  return (
    <div className="BookCard d-flex flex-row mb-3">
      <div className="me-3">
        <BookCover {...bookCoverProps}/>
      </div>
      <div className="Info flex-fill">
        <Link to={`/book/${isbn}`}>
          <h4 className="mb-0">{book.title}</h4>
        </Link>
        <p className="">by&nbsp;
          {book?.authors?.length > 1 ? book?.authors?.map((item, index) => {
            return (<span key={index}>{(index > 0 ? ", " : "") + item}</span>);
          }) : <span>{book?.authors?.[0]}</span>}
        </p>
        <BookProgress {...bookProgressProps}/>
      </div>
    </div>
  );
}

export default BookCard;
