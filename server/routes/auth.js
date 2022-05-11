const express = require("express");
const router = express.Router();
const {signIn, signUp, forgotPassword, resetPassword} = require("../controllers/auth");

// Access user account
router.route("/signIn").post(signIn);

// Create a user account
router.route("/signUp").post(signUp);

// Request to reset user password
router.route("/forgotPassword").post(forgotPassword);

// Update user password
router.route("/resetPassword/:resetToken").put(resetPassword);

module.exports = router;
