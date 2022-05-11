import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

// Components
import BookCover from "../home/BookCover";

import Bookshelves from "./Bookshelves";
import StatusDropdown from "./StatusDropdown";
import Progress from "./Progress";

function BookCard(bookCardProps) {
  // Props
  const {config, book, results, setDeletedBook, setDeletedBookshelf} = bookCardProps;

  const [isbn, setISBN] = useState();
  const [currentStatus, setCurrentStatus] = useState("Want to Read");
  const [removeBookStatus, setRemoveBookStatus] = useState();

  const statusDropdownProps = {config, book, isbn, currentStatus, setCurrentStatus, removeBookStatus, setRemoveBookStatus, setDeletedBook};
  const progressProps = {config, isbn, pages: book.pages, currentStatus};
  const bookshelvesProps = {config, isbn, removeBookStatus, setDeletedBookshelf};

  useEffect(() => {
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

      if(isbn === undefined) {
        getISBN10();
      }
    }
  }, [results]);

  return (
    <div className="BookCard row mb-5">
      <div className="left col-lg-3 d-flex flex-column align-items-center mb-3 mb-lg-0">
        <BookCover book={book} isbn={isbn}/>
        <StatusDropdown {...statusDropdownProps}/>
      </div>
      <div className="right col-lg-9 shadow-sm border p-3">
        <div className="text-center text-lg-start">
          <div className="d-flex justify-content-center justify-content-lg-start">
            <Link to={`/book/${isbn}`}>
              <h4 className="mb-0">{book.title}</h4>
            </Link>
          </div>
          <h5>by&nbsp;
            {book?.authors?.length > 1 ? book?.authors?.map((item, index) => {
              return (<span key={index}>{(index > 0 ? ", " : "") + item}</span>);
            }) : <span>{book?.authors?.[0]}</span>}
          </h5>
          <p className="mb-0">{book.pages} pages</p>
          <p>ISBN: {isbn}</p>
          <Progress {...progressProps}/>
          <Bookshelves {...bookshelvesProps}/>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
