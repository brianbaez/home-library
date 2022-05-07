import React from "react";

// Components
import BookCover from "../BookCover";
import ViewAllButton from "../ViewAllButton";

function WantToReadBooks({wantToRead}) {
  return (
    <div className="WantToReadBooks">
      <div className="row row-cols-auto">
        {wantToRead.map((book, index) => {
          console.log(book);
          if(index < 8) {
            return (
              <BookCover book={book}/>
            );
          }
        })}
      </div>
      <ViewAllButton bookshelf={"want-to-read"}/>
    </div>
  );
}

export default WantToReadBooks;
