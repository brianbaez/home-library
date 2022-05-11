const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/auth");
const {browseBooks} = require("../../controllers/private/browse");

// Get book results from Google Books API
router.route("/browse").get(protect, browseBooks);

module.exports = router;
