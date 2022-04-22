const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const {checkUser, checkChallenge} = require("./helper");

exports.getChallenge = async (req, res, next) => {
  const userData = req.user;
  const {year} = req.body;

  if(!year) {
    return next(new ErrorResponse("Please provide a year", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to delete challenge", 401));
    }

    if((await checkChallenge(userData._id, year)).length === 0) {
      return next(new ErrorResponse("There is no challenge for this year", 404));
    }

    // Get challenge
    const challenge = await User.aggregate([
      {$match: {"_id": userData._id}},
      {$unwind: "$challenges"},
      {$match: {"challenges.year": {$eq: year}}},
      {$project: {"challenges": 1, "_id": 0}}
    ]);

    res.status(200).json({
      success: true,
      message: "Challenge goals have been sent",
      data: challenge
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to get challenge", 401));
  }
}

exports.editChallenge = async (req, res, next) => {
  const userData = req.user;
  const {year, bookGoal, pageGoal} = req.body;

  if(!year || (!bookGoal && !pageGoal)) {
    return next(new ErrorResponse("Please provide a year and a book/page goal", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to edit challenge", 401));
    }

    // Check if the given year exists in the challenges array
    if((await checkChallenge(userData._id, year)).length === 0) {
      console.log("No challenges are set for " + year);

      // Create an array element for that year
      await User.updateOne(
        {"_id": userData._id},
        {$push: {
          "challenges": {
            "year": year,
            "bookGoal": 0,
            "pageGoal": 0
          }
        }}
      );
    }

    // Update book goal
    if(bookGoal) {
      await User.updateOne(
        {$and: [
          {"_id": userData._id},
          {"challenges.year": {$eq: year}}
        ]},
        {$set:
          {"challenges.$.bookGoal": bookGoal}
        }
      );
    }

    // Update page goal
    if(pageGoal) {
      await User.updateOne(
        {$and: [
          {"_id": userData._id},
          {"challenges.year": {$eq: year}}
        ]},
        {$set:
          {"challenges.$.pageGoal": pageGoal}
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Challenge has been edited"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to edit challenge", 401));
  }
}

exports.deleteChallenge = async (req, res, next) => {
  const userData = req.user;
  const {year} = req.body;

  if(!year) {
    return next(new ErrorResponse("Please provide a year", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to delete challenge", 401));
    }

    if((await checkChallenge(userData._id, year)).length === 0) {
      return next(new ErrorResponse("There is no challenge for this year", 404));
    }

    // Delete challenge
    await User.updateOne(
      {"_id": userData._id},
      {$pull: {
        "challenges": {"year": {$eq: year}}
      }}
    );

    res.status(200).json({
      success: true,
      message: "Challenge has been deleted"
    })
  }
  catch(error) {
    return next(new ErrorResponse("Failed to delete challenge", 401));
  }

}
