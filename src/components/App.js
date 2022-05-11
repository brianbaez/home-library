import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Pages
import MainPage from "../pages/MainPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

import HomePage from "../pages/HomePage";
import MyBooksPage from "../pages/MyBooksPage";
import ReadingChallengesPage from "../pages/ReadingChallengesPage";
import BrowsePage from "../pages/BrowsePage";
import BookPage from "../pages/BookPage";
import JournalPage from "../pages/JournalPage";
import EntryPage from "../pages/EntryPage";
import ManageAccountPage from "../pages/ManageAccountPage";
import NotFound from "../pages/NotFound";

// Routing
import PrivateRoute from "./routing/PrivateRoute";

// Styles
import "../assets/styles/App.css";

function App() {
  const config = {
    header: {
      "Content-Type": "application/json"
    }
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignInPage config={config}/>} />
          <Route path="/signup" element={<SignUpPage config={config}/>} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage config={config}/>} />
          <Route path="/resetpassword/:resetToken" element={<ResetPasswordPage config={config}/>} />
          <Route path="/*" element={<NotFound />} />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/my-books/" element={<MyBooksPage />} />
            <Route path="/my-books/:bookshelfParam" element={<MyBooksPage />} />
            <Route path="/my-reading-challenges" element={<ReadingChallengesPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/book/:isbn" element={<BookPage />} />
            <Route path="/journal/:isbn" element={<JournalPage />} />
            <Route path="/journal/:isbn/edit/:entryID" element={<EntryPage />} />
            <Route path="/journal/:isbn/add" element={<EntryPage />} />
            <Route path="/account" element={<ManageAccountPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
