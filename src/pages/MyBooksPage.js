import React from "react";

import Navbar from "../components/Navbar";

function MyBooksPage() {
  return (
    <div>
      <Navbar />

      <div className="container mybooks-content mt-3 mb-3">
        <div className="row d-flex">
          <div className="col col-3">
            <h4>My Books</h4>
          </div>
          <div className="col col-9">
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="">0 books</h4>
              </div>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search my books" aria-label="Search my books"></input>
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>

        <hr className="mt-2"></hr>

        <div className="row">
          <div class="col col-3 d-none-sm d-block-lg">
            <div>
              <div className="bookshelves">
                <h5>Bookshelves</h5>
                <p className="mb-0">All</p>
                <p className="mb-0">Read</p>
                <p className="mb-0">Currently Reading</p>
                <p className="mb-0">Want to Read</p>
                <p className="mb-0">Did Not Finish</p>
                <p className="mb-0">wish-list</p>
                <p className="mb-0">in-my-library</p>
              </div>
            </div>
          </div>

          <div class="col col-9">
            <div className="col-content">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBooksPage;
