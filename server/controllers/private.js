exports.getPrivateHomeData = (req, res, next) => {
  console.log("Next!");
  res.status(200).json({
    success: true,
    data: "You got access to the private home data in this route"
  });

  console.log("You got access to the private home data in this route");
}

exports.getPrivateBooksData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You got access to the private books data in this route"
  });

  console.log("You got access to the private books data in this route");
}

exports.getPrivateStatsData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You got access to the private stats data in this route"
  });

  console.log("You got access to the private stats data in this route");
}

exports.getPrivateChallengesData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You got access to the private challenges data in this route"
  });

  console.log("You got access to the private challenges data in this route");
}
