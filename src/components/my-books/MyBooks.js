import React, {useState} from "react";

// Components
import SearchBar from "./SearchBar";
import Bookshelves from "./bookshelves/Bookshelves";
import BookResults from "../browse/BookResults";

function MyBooks(myBooksProps) {
  // Props
  const {config, bookshelfParam} = myBooksProps;

  const [books, setBooks] = useState();
  const [deletedBook, setDeletedBook] = useState(false);
  const [deletedBookshelf, setDeletedBookshelf] = useState(false);
  const [error, setError] = useState();

  const bookshelvesProps = {config, setBooks, deletedBook, setDeletedBook, setError, deletedBookshelf};
  const bookResultsProps = {config, results: books, setDeletedBook, setDeletedBookshelf};

  return (
    <div className="container mybooks-content mt-3 mb-3">
      <div className="row d-flex">
        <div className="col col-3">
          <h4>My Books</h4>
        </div>
        <div className="col col-9">
          <div className="d-flex justify-content-between">
            <div>
              {books && <h4 className="">{books.length} {books.length === 1 ? <span>book</span> : <span>books</span>} {bookshelfParam ? <span>in {bookshelfParam}</span> : null}</h4>}
            </div>
            <SearchBar booksCopy={books} books={books} setBooks={setBooks}/>
          </div>
        </div>
      </div>

      <hr className="mt-2"></hr>

      <div className="row">
        <Bookshelves {...bookshelvesProps}/>
        <div className="col col-9">
            {error && <span>{error}</span>}
            {books && <BookResults {...bookResultsProps}/>}
        </div>
      </div>
    </div>
  );
}

export default MyBooks;
