import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import {defaultBookshelvesItems} from "./DefaultBookshelvesItems";

function DefaultBookshelves({setBookshelf}) {
  const clickHandler = (e) => {
    e.preventDefault();
    setBookshelf(e.target.rel);
  }

  return (
    <div className="DefaultBookshelves d-flex flex-column">
      {defaultBookshelvesItems.map((item) => {
        return(
          <div key={item.id} className="Bookshelf">
            <a className="mb-0" href="#" rel={item.tag} onClick={(e) => clickHandler(e)}>{item.name}</a>
          </div>
        );
      })}
    </div>
  );
}

export default DefaultBookshelves;
