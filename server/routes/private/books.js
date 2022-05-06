const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/auth");
const {addBook, getBook, editBook, deleteBook} = require("../../controllers/private/books");

// Get book(s)
router.route("/books/:isbn?").get(protect, getBook);

// Add book
router.route("/books/:isbnToAdd").post(protect, addBook);

// Edit book
router.route("/books/:isbn").put(protect, editBook);

// Delete book
router.route("/books/:isbn").delete(protect, deleteBook);

module.exports = router;
