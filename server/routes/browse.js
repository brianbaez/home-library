const express = require("express");
const router = express.Router();
const {browseBooks} = require("../controllers/browse");

// Get book results from Google Books API
router.route("/browse").get(browseBooks);

module.exports = router;
