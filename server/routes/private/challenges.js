const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/auth");
const {getChallenge, editChallenge, deleteChallenge} = require("../../controllers/private/challenges");

// Get challenge
router.route("/challenges").get(protect, getChallenge);

// Add/edit challenge
router.route("/challenges").put(protect, editChallenge);

// Delete challenge
router.route("/challenges").delete(protect, deleteChallenge);

module.exports = router;
