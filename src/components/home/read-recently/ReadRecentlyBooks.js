import React from "react";

// Components
import BookCover from "../BookCover";
import ViewAllButton from "../ViewAllButton";

function ReadRecentlyBooks({readRecently}) {
  // Get ISBN for the book
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
    <div className="ReadRecentlyBooks d-flex flex-column">
      <div className="BookCovers row row-cols-auto">
        {readRecently.slice(0).reverse().map((book, index) => {
          if(index < 8) {
            return (
              <div className="mb-3">
                <BookCover book={book} isbn={getISBN(book.isbn)}/>
              </div>
            );
          }
        })}
      </div>
      <div>
        <ViewAllButton bookshelf={"read"}/>
      </div>
    </div>
  );
}

export default ReadRecentlyBooks;
