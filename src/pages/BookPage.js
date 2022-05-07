import React from "react";
import {useOutletContext, useParams} from "react-router-dom";

// Components
import BookResult from "../components/book/BookResult";

// Hooks
import useAuth from "../components/hooks/useAuth";

function BookPage() {
  const config = useOutletContext();
  const {isbn} = useParams();
  const isAuth = useAuth({config});
  const bookProps = {config, isbn};

  if(isAuth) {
    return (
      <div className="BookPage">
        <BookResult {...bookProps}/>
      </div>
    );
  }
}

export default BookPage;
