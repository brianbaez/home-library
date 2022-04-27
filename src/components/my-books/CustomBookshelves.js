import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import {defaultBookshelvesItems} from "./DefaultBookshelvesItems";

function CustomBookshelves({setBookshelf, config}) {
  const [customBookshelves, setCustomBookshelves] = useState([]);

  useEffect(() => {
    const fetchCustomBookshelves = async () => {
      await axios.get(`/api/private/bookshelves`, config)
      .then((res) => {
        const shelvesData = res.data.data[0].shelves;

        // Get all default tags
        const defaultTags = [];

        for(var i = 1; i < defaultBookshelvesItems.length; i++) {
          defaultTags.push(defaultBookshelvesItems[i].tag)
        }

        // Get difference between both
        let difference = shelvesData.filter(x => !defaultTags.includes(x));

        const customShelves = [];

        difference.forEach((item) => {
          customShelves.push({
            "id": defaultBookshelvesItems.length + customShelves.length,
            "name": item,
            "tag": item
          });
        });

        setCustomBookshelves(customShelves)
      });
    }

    fetchCustomBookshelves();
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();
    setBookshelf(e.target.rel);
  }

  if(customBookshelves.length !== 0) {
    return (
      <div className="CustomBookshelves d-flex flex-column">
        <hr className="mt-2 mb-2"></hr>
        {customBookshelves.map((item) => {
          return(
            <div key={item.id} className="Bookshelf">
              <a className="mb-0" href="#" rel={item.tag} onClick={(e) => clickHandler(e)}>{item.name}</a>
            </div>
          )
        })}
      </div>
    );
  }
}

export default CustomBookshelves;
