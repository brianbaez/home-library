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
import BookPage from "../pages/BookPage";
import ReadingChallengesPage from "../pages/ReadingChallengesPage";
import BrowsePage from "../pages/BrowsePage";
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
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/signin" element={<SignInPage config={config}/>} />
          <Route exact path="/signup" element={<SignUpPage config={config}/>} />
          <Route exact path="/forgotpassword" element={<ForgotPasswordPage config={config}/>} />
          <Route exact path="/resetpassword/:resetToken" element={<ResetPasswordPage config={config}/>} />

          <Route element={<PrivateRoute />}>
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/my-books/" element={<MyBooksPage />} />
            <Route exact path="/my-books/:bookshelfParam" element={<MyBooksPage />} />
            <Route exact path="/my-reading-challenges" element={<ReadingChallengesPage />} />
            <Route exact path="/browse" element={<BrowsePage />} />
            <Route exact path="/book/:isbn" element={<BookPage />} />
            <Route exact path="/journal/:isbn" element={<JournalPage />} />
            <Route exact path="/journal/:isbn/edit/:entryID" element={<EntryPage />} />
            <Route exact path="/journal/:isbn/add" element={<EntryPage />} />
            <Route exact path="/account" element={<ManageAccountPage />} />
            <Route exact path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
