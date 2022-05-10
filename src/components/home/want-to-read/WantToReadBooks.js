import React from "react";

// Components
import BookCover from "../BookCover";
import ViewAllButton from "../ViewAllButton";

function WantToReadBooks({wantToRead}) {
  const getISBN = (isbnArray) => {
    var isbn;

    const getISBN13 = () => {
      isbnArray.map((item) => {
        if(item.type === "ISBN_13") {
          isbn = item.identifier;
        }
      });

      return isbn;
    };

    const getISBN10 = () => {
      isbnArray.map((item) => {
        if(item.type === "ISBN_10") {
          isbn = item.identifier;
        }
      });

      return isbn;
    }

    getISBN13();

    if(isbn === undefined) {
      getISBN10();
    }

    return isbn;
  }

  return (
    <div className="WantToReadBooks d-flex flex-column">
      <div className="BookCovers row row-cols-auto">
        {wantToRead.map((book, index) => {
          if(index < 8) {
            return (
              <BookCover book={book} isbn={getISBN(book.isbn)}/>
            );
          }
        })}
      </div>
      <ViewAllButton bookshelf={"want-to-read"}/>
    </div>
  );
}

export default WantToReadBooks;
