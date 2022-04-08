import React from "react";

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
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
