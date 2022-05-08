const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");

exports.getPrivateHomeData = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "You got access to the private home data in this route",
    data: req.user
  });
}

exports.getPrivateBooksData = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "You got access to the private books data in this route",
    data: req.user
  });
}

exports.getPrivateStatsData = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "You got access to the private stats data in this route",
    data: req.user
  });
}

exports.getPrivateChallengesData = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "You got access to the private challenges data in this route",
    data: req.user
  });
}

exports.getPrivateUserData = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "You have access to the user data",
    data: req.user
  });
}
