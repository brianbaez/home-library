import React from "react";
import {Link} from "react-router-dom";

// Components
import BookCover from "../home/BookCover";

function Book(bookProps) {
  // Props
  const {isbn, book, journal} = bookProps;

  const bookCoverProps = {isbn, book};

  return (
    <div className="Book d-flex">
      <div className="Cover">
        <BookCover {...bookCoverProps} />
      </div>
      <div className="Info ms-3">
        <Link to={`/book/${isbn}`}>
          <h4 className="mb-0">{book.title}</h4>
        </Link>
        <h5 className="mb-1">by&nbsp;
          {book?.authors?.length > 1 ? book?.authors?.map((item, index) => {
            return (<span key={index}>{(index > 0 ? ", " : "") + item}</span>);
          }) : <span>{book?.authors?.[0]}</span>}
        </h5>
        <p className="mb-0">{book.pages} pages</p>
        {journal && <p>{journal.length || <span>0</span>} {(journal.length === 1) ? <span>entry</span> : <span>entries</span>}</p>}
      </div>
    </div>
  );
}

export default Book;
