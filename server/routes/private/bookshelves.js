const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/auth");
const {getBookshelf, addToBookshelf, deleteFromBookshelf} = require("../../controllers/private/bookshelves");

// Get bookshelf
router.route("/bookshelves/:name").get(protect, getBookshelf);

// Add to bookshelf
router.route("/bookshelves").put(protect, addToBookshelf);

// Delete from bookshelf
router.route("/bookshelves").delete(protect, deleteFromBookshelf);

module.exports = router;
