const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/auth");
const {getPrivateHomeData, getPrivateBooksData, getPrivateStatsData, getPrivateChallengesData} = require("../controllers/private");
const {addBook, getBook, deleteBook} = require("../controllers/books");

router.route("/home").get(protect, getPrivateHomeData);

router.route("/my-books").get(protect, getPrivateBooksData);

router.route("/my-stats").get(protect, getPrivateStatsData);

router.route("/my-reading-challenges").get(protect, getPrivateChallengesData);

// Get book
router.route("/books/:isbn?").get(protect, getBook);

// Add book
router.route("/books/").put(protect, addBook);

// Delete book
router.route("/books/:isbn").delete(protect, deleteBook);

module.exports = router;
