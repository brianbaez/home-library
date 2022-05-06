const express = require("express");
const router = express.Router();
const {signIn, signUp, forgotPassword, resetPassword} = require("../controllers/auth");

router.route("/signIn").post(signIn);

router.route("/signUp").post(signUp);

router.route("/forgotPassword").post(forgotPassword);

router.route("/resetPassword/:resetToken").put(resetPassword);

module.exports = router;
