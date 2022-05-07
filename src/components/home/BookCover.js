import React from "react";
import {Link} from "react-router-dom";

function BookCover(bookCoverProps) {
  // Props
  const {book, isbn} = bookCoverProps;

  return (
    <div className="BookCover col pb-3">
      {book &&
        <Link to={`/book/${isbn}`}>
          <img src={book.cover.thumbnail} alt="book-cover"></img>
        </Link>
      }
    </div>
  );
}

export default BookCover;
