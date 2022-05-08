import React from "react";
import {useNavigate} from "react-router-dom";

// Components
import {defaultBookshelvesItems} from "./DefaultBookshelvesItems";

function DefaultBookshelves({setBookshelf}) {
  let navigate = useNavigate();

  const clickHandler = (e) => {
    e.preventDefault();
    setBookshelf(e.target.rel);

    navigate(`/my-books/${e.target.rel}`);
  }

  return (
    <div className="DefaultBookshelves d-flex flex-column">
      {defaultBookshelvesItems.map((item) => {
        return(
          <div key={item.id} className="Bookshelf">
            <a className="mb-0" href={`/my-books/${item.tag}`} rel={item.tag} onClick={(e) => clickHandler(e)}>{item.name}</a>
          </div>
        );
      })}
    </div>
  );
}

export default DefaultBookshelves;
