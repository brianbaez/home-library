const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/auth");
const {getBookshelf, getBookshelves, addToBookshelf, deleteFromBookshelf} = require("../../controllers/private/bookshelves");

// Get bookshelf
router.route("/bookshelves/:name").get(protect, getBookshelf);

// Get all unique bookshelf names
router.route("/bookshelves").get(protect, getBookshelves);

// Add to bookshelf
router.route("/bookshelves/:name/:isbn").post(protect, addToBookshelf);

// Delete from bookshelf
router.route("/bookshelves/:name/:isbn").delete(protect, deleteFromBookshelf);

module.exports = router;
