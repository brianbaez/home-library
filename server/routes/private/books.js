const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/auth");
const {addBook, getBook, deleteBook} = require("../../controllers/private/books");

// Get book(s)
router.route("/books/:isbn?").get(protect, getBook);

// Add book
router.route("/books").post(protect, addBook);

// Delete book
router.route("/books/:isbn").delete(protect, deleteBook);

module.exports = router;
