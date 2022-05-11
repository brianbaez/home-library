const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/auth");
const {getUserData, updateEmail, updateUsername, updatePassword, deleteAccount} = require("../../controllers/private/account");

// Get user's id, email, and username
router.route("/account").get(protect, getUserData);

// Update user email
router.route("/account/edit/email").put(protect, updateEmail);

// Update username
router.route("/account/edit/username").put(protect, updateUsername);

// Update user password
router.route("/account/edit/password").put(protect, updatePassword);

// Delete book
router.route("/account/delete").delete(protect, deleteAccount);

module.exports = router;
