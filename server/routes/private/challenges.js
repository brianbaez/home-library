const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/auth");
const {getChallenge, addChallenge, editChallenge, deleteChallenge} = require("../../controllers/private/challenges");

// Get challenge(s)
router.route("/challenges/:year?").get(protect, getChallenge);

// Add challenge
router.route("/challenges").post(protect, addChallenge);

// Edit challenge
router.route("/challenges/:year").put(protect, editChallenge);

// Delete challenge
router.route("/challenges/:year").delete(protect, deleteChallenge);

module.exports = router;
