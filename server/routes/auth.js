const express = require("express");
const router = express.Router();
const {signin, signup, forgotpassword, resetpassword} = require("../controllers/auth");

router.route("/signin").post(signin);

router.route("/signup").post(signup);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

module.exports = router;
