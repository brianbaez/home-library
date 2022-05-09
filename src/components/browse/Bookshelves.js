import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import Button from "../Button";

function Bookshelves(bookshelvesProps) {
  // Props
  const {config, isbn, removeBookStatus, setDeletedBookshelf} = bookshelvesProps;

  const [bookshelves, setBookshelves] = useState();
  const [bookshelfToAdd, setBookshelfToAdd] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBookshelves = async () => {
      if(isbn) {
        await axios.get(`/api/private/bookshelves/book/${isbn}`, config)
        .then((res) => {
          setBookshelves(res.data.data[0].bookshelves);
          setSuccess(true);
          setError();
        })
        .catch((error) => {
          setSuccess(false);
          setError(error.response.data.error);
          setBookshelves();
        })
      }
    }

    fetchBookshelves();
  }, [isbn, bookshelves, removeBookStatus]);

  const addBookshelfHandler = async (e) => {
    e.preventDefault();

    await axios.post(`/api/private/bookshelves/${bookshelfToAdd}/${isbn}`, {}, config)
    .then((res) => {})
    .catch((error) => {});
  }

  const deleteBookshelfHandler = async (bookshelfToDelete) => {
    await axios.delete(`/api/private/bookshelves/${bookshelfToDelete}/${isbn}`, config)
    .then((res) => {
      setDeletedBookshelf(true);
    })
    .catch((error) => {});
  }

  return (
    <div className="Bookshelves">
      {removeBookStatus &&
        <div>
          <hr className="mt-3 mb-3"></hr>
          <h4>Bookshelves</h4>
          <div className="BookshelvesList d-flex">
            {bookshelves && bookshelves.map((item, index) => {
              return (
                <div key={index} className="d-flex align-items-center py-1 px-2 me-3 mb-0" style={{backgroundColor: "#EEECE8"}}>
                  <span className="mb-0 me-1">{item}</span>
                  <button type="button" className="btn-close" style={{fontSize: "0.75rem"}} onClick={() => deleteBookshelfHandler(item)}></button>
                </div>
              );
            })}
          </div>

          <div className="AddBookshelf mt-2">
            <button type="button" className="btn" data-bs-toggle="collapse" data-bs-target={`#addBookshelf-${isbn}`} aria-expanded="false" aria-controls={`addBookshelf-${isbn}`}>Add Bookshelf</button>
            <form className="AddBookshelfFields collapse mt-2" id={`addBookshelf-${isbn}`} onSubmit={addBookshelfHandler}>
              <div className="form-group">
                <input required type="text" placeholder="Enter a bookshelf name" maxLength="100" value={bookshelfToAdd} onChange={(e) => setBookshelfToAdd(e.target.value)}></input>
                <button className="btn ms-2" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default Bookshelves;
