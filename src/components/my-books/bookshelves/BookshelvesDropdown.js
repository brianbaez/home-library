import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

// Components
import {defaultBookshelvesItems} from "./DefaultBookshelvesItems";

function BookshelvesDropdown(bookshelvesDropdownProps) {
  // Props
  const {customBookshelves, setBookshelf, setBooksLoading} = bookshelvesDropdownProps;

  let navigate = useNavigate();
  let {bookshelfParam} = useParams();

  const {currentBookshelf, setCurrentBookshelf} = useState();

  const clickHandler = (e) => {
    e.preventDefault();
    setBookshelf(e.target.rel);
    setBooksLoading(true);

    navigate(`/my-books/${e.target.rel}`);
  }

  return (
    <div className="BookshelvesDropdown btn-group">
      <button type="button" className="btn btn-sm text-nowrap">{bookshelfParam || "All"}</button>
      <button className="btn btn-sm dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>
      <div className="dropdown-menu dropdown-menu-start" aria-labelledby="bookshelvesDropdown">
        {defaultBookshelvesItems.map((item, index) => {
          if(item.tag !== bookshelfParam) {
            return (
              <div key={item.id} className="Bookshelf">
                <a className="bookshelf-item dropdown-item" href={`/my-books/${item.tag}`} rel={item.tag} onClick={(e) => clickHandler(e)}>{item.name}</a>
              </div>
            );
          }
        })}
        <hr className="dropdown-divider"></hr>
        {customBookshelves.map((item, index) => {
          if(item.tag !== bookshelfParam) {
            return (
              <div key={item.id} className="Bookshelf">
                <a className="bookshelf-item dropdown-item" href={`/my-books/${item.tag}`} rel={item.tag} onClick={(e) => clickHandler(e)}>{item.name}</a>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default BookshelvesDropdown;
