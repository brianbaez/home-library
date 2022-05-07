import React from "react";

// Components
import BookCover from "../BookCover";
import ViewAllButton from "../ViewAllButton";

function ReadRecentlyBooks({readRecently}) {
  return (
    <div className="ReadRecentlyBooks d-flex flex-column">
      <div className="BookCovers row row-cols-auto">
        {readRecently.slice(0).reverse().map((book, index) => {
          if(index < 8) {
            return (
              <BookCover book={book} />
            );
          }
        })}
      </div>
      <ViewAllButton bookshelf={"read"}/>
    </div>
  );
}

export default ReadRecentlyBooks;
