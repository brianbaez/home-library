const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/auth");
const {getBookshelf, getBookshelvesOfISBN, getBookshelves, addToBookshelf, deleteFromBookshelf} = require("../../controllers/private/bookshelves");

// Get bookshelf
router.route("/bookshelves/books/:name").get(protect, getBookshelf);

// Get all bookshelves for a book
router.route("/bookshelves/book/:isbn").get(protect, getBookshelvesOfISBN);

// Get all unique bookshelf names
router.route("/bookshelves").get(protect, getBookshelves);

// Add to bookshelf
router.route("/bookshelves/:name/:isbn").post(protect, addToBookshelf);

// Delete from bookshelf
router.route("/bookshelves/:name/:isbn").delete(protect, deleteFromBookshelf);

module.exports = router;
