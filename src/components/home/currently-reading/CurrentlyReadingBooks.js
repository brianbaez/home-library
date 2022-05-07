import React from "react";

// Components
import BookCard from "./BookCard";
import ViewAllButton from "../ViewAllButton";

function CurrentlyReadingBooks(currentlyReadingBooksProps) {
  // Props
  const {config, currentlyReading, success, setSuccess, error, setError} = currentlyReadingBooksProps;

  const bookCardProps = {config, success, setSuccess, error, setError};

  return (
    <div className="CurrentlyReadingBooks">
      {currentlyReading.map((book, index) => {
        if(index < 2) {
          return (
            <BookCard book={book} {...bookCardProps}/>
          );
        }
      })}
      <ViewAllButton bookshelf={"currently-reading"}/>
    </div>
  );
}

export default CurrentlyReadingBooks;
