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
import StatsPage from "../pages/StatsPage";
import ReadingChallengesPage from "../pages/ReadingChallengesPage";
import Browse from "../pages/Browse";
import NotFound from "../pages/NotFound";

// Routing
import PrivateRoute from "./routing/PrivateRoute";

// Styles
import "../assets/styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/signin" element={<SignInPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route exact path="/resetpassword/:resetToken" element={<ResetPasswordPage />} />

          <Route element={<PrivateRoute />}>
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/my-books" element={<MyBooksPage />} />
            <Route exact path="/my-stats" element={<StatsPage />} />
            <Route exact path="/my-reading-challenges" element={<ReadingChallengesPage />} />
            <Route exact path="/browse" element={<Browse />} />
            <Route exact path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
