import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import MainPage from "../pages/MainPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import HomePage from "../pages/HomePage";
import MyBooksPage from "../pages/MyBooksPage";
import BookPage from "../pages/BookPage";
import StatsPage from "../pages/StatsPage";
import ReadingChallengesPage from "../pages/ReadingChallengesPage";

import "../assets/styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/resetpassword" element={<ResetPasswordPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/my-books" element={<MyBooksPage />} />
          <Route path="/my-stats" element={<StatsPage />} />
          <Route exact path="/my-reading-challenges" element={<ReadingChallengesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
