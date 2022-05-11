import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import SaveButton from "../SaveButton";

function Bookshelves(bookshelvesProps) {
  // Props
  const {config, isbn, removeBookStatus, setDeletedBookshelf} = bookshelvesProps;

  const [bookshelves, setBookshelves] = useState();
  const [bookshelfToAdd, setBookshelfToAdd] = useState();
  const [success, setSuccess] = useState();
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
    .then((res) => {
      setBookshelfToAdd("");
    })
    .catch((error) => {
      setBookshelfToAdd("");
    });
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
          <div className="BookshelvesList d-flex row row-cols-2 row-cols-lg-auto">
            {bookshelves && bookshelves.map((item, index) => {
              return (
                <div key={index} className="col d-flex justify-content-center mb-2">
                  <div className="p-2" style={{backgroundColor: "#EEECE8"}}>
                    <span className="mb-0 me-1">{item}</span>
                    <button type="button" className="btn-close" style={{fontSize: "0.75rem"}} onClick={() => deleteBookshelfHandler(item)}></button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="AddBookshelf mt-3">
            <button type="button" className="btn" data-bs-toggle="collapse" data-bs-target={`#addBookshelf-${isbn}`} aria-expanded="false" aria-controls={`addBookshelf-${isbn}`}>Add Bookshelf</button>
            <form className="AddBookshelfFields collapse mt-3" id={`addBookshelf-${isbn}`} onSubmit={addBookshelfHandler}>
              <div className="form-group d-flex justify-content-center justify-content-lg-start">
                <input required type="text" placeholder="Enter a bookshelf name" maxLength="100" value={bookshelfToAdd} onChange={(e) => setBookshelfToAdd(e.target.value)}></input>
                <div className="SaveButton ms-2">
                  <SaveButton success={success} error={error} />
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default Bookshelves;
