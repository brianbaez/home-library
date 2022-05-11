import React, {useState, useEffect} from "react";
import axios from "axios";

function StatusDropdown(statusDropdownStats) {
  // Props
  const {config, book, isbn, currentStatus, setCurrentStatus, removeBookStatus, setRemoveBookStatus, setDeletedBook} = statusDropdownStats;

  const [clickedStatus, setClickedStatus] = useState();

  const statusItems = [
    {
      name: "Want to Read",
      tag: "want-to-read"
    },
    {
      name: "Currently Reading",
      tag: "currently-reading"
    },
    {
      name: "Read",
      tag: "read"
    },
    {
      name: "Did Not Finish",
      tag: "did-not-finish"
    }
  ];

  useEffect(() => {
    // Get book by ISBN and get its status
    const fetchBook = async () => {
      if(isbn) {
        await axios.get(`/api/private/books/${isbn}`, config)
        .then((res) => {
          setCurrentStatus(res.data.data[0].books[0].status);
          setRemoveBookStatus(true);
        })
        .catch((error) => {
          setRemoveBookStatus(false);
        })
      }
    }

    fetchBook();
  }, [isbn]);

  const updateStatusHandler = async (e) => {
    e.preventDefault();

    const data = {
      "title": book.title,
      "authors": book.authors,
      "description": book.description,
      "isbn": book.isbn,
      "pages": book.pages,
      "cover": book.cover,
      "status": clickedStatus
    }

    var bookshelfToDelete, bookshelfToAdd;

    statusItems.map((item, index) => {
      if(currentStatus === item.name) {
        bookshelfToDelete = item.tag;
      }

      if(clickedStatus === item.name) {
        bookshelfToAdd = item.tag;
      }
    });

    // Add book to library
    const addBook = async () => {
      return await axios.post(`/api/private/books/${isbn}`, data, config);
    }

    // Update book's status
    const updateStatus = async () => {
      setCurrentStatus(clickedStatus);
      setRemoveBookStatus(true);
      return await axios.put(`/api/private/books/${isbn}`, {status: clickedStatus}, config);
    }

    // Add bookshelf to book (ISBN)
    const addBookshelf = async (bookshelfToAdd) => {
      return await axios.post(`/api/private/bookshelves/${bookshelfToAdd}/${isbn}`, {}, config);
    }

    // Delete bookshelf from book (ISBN)
    const deleteBookshelf = async (bookshelfToDelete) => {
      return await axios.delete(`/api/private/bookshelves/${bookshelfToDelete}/${isbn}`, config);
    }

    if(clickedStatus !== currentStatus) {
      if(clickedStatus === "Remove Book") {
        if(window.confirm("Are you sure you want to remove this book from your library? All your journal entries and review will be deleted.")) {
          // Delete book from library
          await axios.delete(`/api/private/books/${isbn}`, config)
          .then((res) => {
            setRemoveBookStatus(false);
            setCurrentStatus("Want to Read");
            setDeletedBook(true);
          });
        }
      }
      else {
        await addBook().catch((error) => {});
        await deleteBookshelf(bookshelfToDelete).catch((error) => {});
        await addBookshelf(bookshelfToAdd).catch((error) => {});
        await updateStatus().catch((error) => {});
      }
    }

    if(clickedStatus === "Want to Read") {
      await addBook().catch((error) => {});
      await addBookshelf(bookshelfToAdd).catch((error) => {});
      await updateStatus().catch((error) => {});
    }
  }

  return (
    <div className="StatusDropdown btn-group mt-3">
      <form onSubmit={updateStatusHandler}>
        <button type="submit" className="btn btn-sm text-nowrap" href="#" onClick={() => setClickedStatus(currentStatus)}>{currentStatus}</button>
      </form>
      <button type="button" className="btn btn-sm dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>
      <div className="dropdown-menu dropdown-menu-start" aria-labelledby="statusDropdown">
        {statusItems.map((item, index) => {
          if(currentStatus !== item.name) {
            return (
              <form key={index} onSubmit={updateStatusHandler}>
                <button type="submit" className="status-item dropdown-item" href="#" onClick={() => setClickedStatus(item.name)}>{item.name}</button>
              </form>
            );
          }
        })}
        {removeBookStatus &&
          <form onSubmit={updateStatusHandler}>
            <button type="submit" className="status-item dropdown-item" href="" onClick={() => setClickedStatus("Remove Book")}>Remove Book</button>
          </form>
        }
      </div>
    </div>
  );
}

export default StatusDropdown;
