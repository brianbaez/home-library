const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/auth");
const {getPrivateHomeData, getPrivateBooksData, getPrivateStatsData, getPrivateChallengesData, getPrivateUserData} = require("../../controllers/private/private");

router.route("/home").get(protect, getPrivateHomeData);

router.route("/my-books").get(protect, getPrivateBooksData);

router.route("/my-stats").get(protect, getPrivateStatsData);

router.route("/my-reading-challenges").get(protect, getPrivateChallengesData);

router.route("/user").get(protect, getPrivateUserData);

module.exports = router;
