const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const {checkUser, checkChallenge} = require("./helper");

exports.getChallenge = async (req, res, next) => {
  const userData = req.user;
  const {year} = req.params;

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to get challenge", 401));
    }

    var challenges;

    if(!year) {
      // Get all challenges
      challenges = await User.aggregate([
        {$match: {"_id": userData._id}},
        {$unwind: "$challenges"},
        {$sort: {"challenges.year": -1}},
        {$group: {
          "_id": "$_id",
          "challenges": {$push: "$challenges"}
        }}
      ])
    }
    else {
      // Get challenge for that year
      challenges = await User.aggregate([
        {$match: {"_id": userData._id}},
        {$unwind: "$challenges"},
        {$match: {"challenges.year": {$eq: parseInt(year)}}},
        {$project: {"challenges": 1, "_id": 0}}
      ]);

      if(challenges.length === 0) {
        return next(new ErrorResponse("There is no challenge for this year", 404));
      }
    }

    res.status(200).json({
      success: true,
      message: "Challenge goals have been sent",
      data: challenges
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to get challenge", 401));
  }
}

exports.addChallenge = async (req, res, next) => {
  const userData = req.user;
  const {year} = req.params;
  const {bookGoal, pageGoal} = req.body;

  if(!year || !bookGoal || !pageGoal) {
    return next(new ErrorResponse("Please provide a year and a book/page goal", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to edit challenge", 401));
    }

    if((await checkChallenge(userData._id, parseInt(year))).length !== 0) {
      return next(new ErrorResponse("There is already a challenge for this year", 409));
    }

    // Add challenge
    await User.updateOne(
      {"_id": userData._id},
      {$push: {
        "challenges": {
          "year": parseInt(year),
          "bookGoal": bookGoal,
          "pageGoal": pageGoal
        }
      }}
    );

    res.status(200).json({
      success: true,
      message: "Challenge has been added"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to add challenge", 401));
  }
}

exports.editChallenge = async (req, res, next) => {
  const userData = req.user;
  const {year} = req.params;
  const {bookGoal, pageGoal, booksCompleted, pagesCompleted} = req.body;

  if(!year || (!bookGoal && !pageGoal && !booksCompleted && !pagesCompleted)) {
    return next(new ErrorResponse("Please provide a year and a book/page goal", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to edit challenge", 401));
    }

    if((await checkChallenge(userData._id, parseInt(year))).length === 0) {
      return next(new ErrorResponse("There is no challenge for this year", 404));
    }

    if(bookGoal) {
      // Update book goal
      await User.updateOne(
        {$and: [
          {"_id": userData._id},
          {"challenges.year": {$eq: parseInt(year)}}
        ]},
        {$set: {"challenges.$.bookGoal": bookGoal}}
      );
    }

    if(pageGoal) {
      // Update page goal
      await User.updateOne(
        {$and: [
          {"_id": userData._id},
          {"challenges.year": {$eq: parseInt(year)}}
        ]},
        {$set:
          {"challenges.$.pageGoal": pageGoal}
        }
      );
    }

    if(booksCompleted) {
      // Update books completed
      await User.updateOne(
        {$and: [
          {"_id": userData._id},
          {"challenges.year": {$eq: parseInt(year)}}
        ]},
        {$inc:
          {"challenges.$.booksCompleted": booksCompleted}
        }
      );
    }

    if(pagesCompleted) {
      // Update pages completed
      await User.updateOne(
        {$and: [
          {"_id": userData._id},
          {"challenges.year": {$eq: parseInt(year)}}
        ]},
        {$inc:
          {"challenges.$.pagesCompleted": pagesCompleted}
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
  const {year} = req.params;

  if(!year) {
    return next(new ErrorResponse("Please provide a year", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to delete challenge", 401));
    }

    if((await checkChallenge(userData._id, parseInt(year))).length === 0) {
      return next(new ErrorResponse("There is no challenge for this year", 404));
    }

    // Delete challenge
    await User.updateOne(
      {"_id": userData._id},
      {$pull: {
        "challenges": {"year": {$eq: parseInt(year)}}
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
