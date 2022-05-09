import React from "react";

// Components
import BookCard from "./BookCard";

function BookResults(bookResultsProps) {
  // Props
  const {config, results, setDeletedBook, setDeletedBookshelf} = bookResultsProps;
  
  const bookCardProps = {config, results, setDeletedBook, setDeletedBookshelf};

  return (
    <div className="BookResults">
      {results && results.map((item, index) => {
        return (
          <BookCard key={index} book={item} {...bookCardProps}/>
        );
      })}
    </div>
  );
}

export default BookResults;
