import React, {useState, useEffect} from "react";

function SearchBar({books, booksCopy, setBooks}) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState();

  const searchHandler = (e) => {
    e.preventDefault();

    if(query) {
      let titleResults = [];
      let authorResults = [];
      let isbnResults = [];

      // Get results that includes the query in the title
      const filterTitleResults = () => books.filter((book) => {
        if(book.title.toLowerCase().includes(query.toLowerCase())) {
          titleResults.push(book);
        }
      });

      // Get results that includes the query in the authors array
      const filterAuthorResults = () => books.filter((book) => {
        book.authors.map((author) => {
          if(author.toLowerCase().includes(query.toLowerCase())) {
            authorResults.push(book);
          }
        })
      });

      // Get results that includes the ISBN in the ISBN array
      const filterISBNResults = () => books.filter((book) => {
        book.isbn.map((isbn) => {
          if(isbn.identifier === query) {
            isbnResults.push(book);
          }
        });
      });

      filterTitleResults();
      filterAuthorResults();
      filterISBNResults();

      const combined = titleResults.concat(authorResults).concat(isbnResults);
      const unique = new Set(combined);

      const results = [];

      unique.forEach((book) => {
        results.push(book);
      })

      setBooks(results);
    }
  }

  return (
    <form className="d-flex" onSubmit={searchHandler}>
      <input className="form-control me-2" type="search" placeholder="Search my books" aria-label="Search my books" value={query} onChange={(e) => setQuery(e.target.value)}></input>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
