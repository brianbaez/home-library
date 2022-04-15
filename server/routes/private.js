const express = require("express");
const router = express.Router();
const {getPrivateHomeData, getPrivateBooksData, getPrivateStatsData, getPrivateChallengesData} = require("../controllers/private");
const {protect} = require("../middleware/auth");

router.route("/home").get(protect, getPrivateHomeData);

router.route("/my-books").get(protect, getPrivateBooksData);

router.route("/my-stats").get(protect, getPrivateStatsData);

router.route("/my-reading-challenges").get(protect, getPrivateChallengesData);

module.exports = router;
