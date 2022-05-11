import React, {useState, useEffect} from "react";
import axios from "axios";
import parse from "html-react-parser";

// Components
import BookCover from "../home/BookCover";
import StatusDropdown from "../results/StatusDropdown";
import Progress from "../results/Progress";
import Bookshelves from "../results/Bookshelves";

import Activity from "./activity/Activity";
import Review from "./review/Review";

function BookResult(bookProps) {
  // Props
  const {config, isbn} = bookProps;

  const [results, setResults] = useState();
  const [book, setBook] = useState();
  const [currentStatus, setCurrentStatus] = useState("Want to Read");
  const [removeBookStatus, setRemoveBookStatus] = useState();

  const [error, setError] = useState();

  const progressProps = {config, isbn, pages: book?.pages, currentStatus};
  const bookshelvesProps = {config, isbn, removeBookStatus};
  const activityProps = {config, isbn, year: book?.yearRead, currentStatus};
  const reviewProps = {config, isbn, currentStatus};

  useEffect(() => {
    // Get book result by ISBN
    if(isbn) {
      const fetchResults = async () => {
        await axios.get(`/api/private/browse?search=${isbn}`, config)
        .then((res) => {
          setResults(res.data.results);
        })
        .catch((error) => {});
      }

      fetchResults();
    }
  }, [isbn]);

  useEffect(() => {
    // Find book from results that matches the ISBN
    if(results) {
      const fetchBook = async () => {
        results.forEach((book) => {
          book.isbn.map((item) => {
            if(item.identifier === isbn) {
              setBook(book);
            }
          });
        });
      }

      fetchBook();
    }
  }, [results]);

  return (
    <div className="BookResult container my-3">
      {book &&
        <div className="Book d-flex flex-column flex-lg-row">
          <div className="left d-flex flex-column align-items-center mb-5 mb-lg-0 me-lg-5">
            <BookCover book={book} isbn={isbn} />
            <StatusDropdown config={config} book={book} isbn={isbn} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} removeBookStatus={removeBookStatus} setRemoveBookStatus={setRemoveBookStatus} />
          </div>
          <div className="right text-center text-lg-start d-flex flex-column flex-fill shadow-sm border p-3">
            <h4 className="mb-0">{book.title}</h4>
            <h5 className="">by&nbsp;
              {book?.authors?.length > 1 ? book?.authors?.map((item, index) => {
                return (<span key={index}>{(index > 0 ? ", " : "") + item}</span>);
              }) : <span>{book?.authors?.[0]}</span>}
            </h5>
            <p className="mb-0">{book.pages} pages</p>
            <p>ISBN: {isbn}</p>
            <Progress {...progressProps}/>
            <Bookshelves {...bookshelvesProps} />
            <Activity {...activityProps}/>
            <Review {...reviewProps}/>
            <div className="Description">
              <hr className="my-3"></hr>
              <p>{parse(book.description)}</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default BookResult;
