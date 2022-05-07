import React from "react";
import {useOutletContext, useParams} from "react-router-dom";

// Components
import MyBooks from "../components/my-books/MyBooks";

// Hooks
import useAuth from "../components/hooks/useAuth";

function MyBooksPage() {
  const config = useOutletContext();
  const {bookshelfParam} = useParams();
  const isAuth = useAuth({config});
  const myBooksProps = {config, bookshelfParam};

  if(isAuth) {
    return (
      <div className="MyBooksPage">
        <MyBooks {...myBooksProps}/>
      </div>
    );
  }
}

export default MyBooksPage;
