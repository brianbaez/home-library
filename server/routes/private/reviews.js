const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/auth");
const {getReview, addReview, editReview, deleteReview} = require("../../controllers/private/reviews");

// Get review
router.route("/reviews/:isbn").get(protect, getReview);

// Add review
router.route("/reviews/:isbn").post(protect, addReview);

// Edit review
router.route("/reviews/:isbn").put(protect, editReview);

// Delete review
router.route("/reviews/:isbn").delete(protect, deleteReview);

module.exports = router;
