const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const {checkUser, checkBook, checkReview} = require("./helper");

exports.getReview = async (req, res, next) => {
  const userData = req.user;
  const {isbn} = req.params;

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to get review", 401));
    }

    if(!(await checkBook(userData._id, isbn))) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    // Get review for that book
    review = await User.aggregate([
      {$match: {"_id": userData._id}},
      {$unwind: "$library.books"},
      {$match: {
        "library.books.isbn.identifier": {$eq: isbn},
        "library.books.review.rating.wholeNumber": {$ne: -1},
        "library.books.review.rating.decimalNumber": {$ne: -1},
      }},
      {$group: {
        "_id": "$_id",
        "review": {$push: "$library.books.review"}
      }}
    ]);

    if(review.length === 0) {
      return next(new ErrorResponse("This book does not have a review", 404));
    }

    res.status(200).json({
      success: true,
      message: "Review has been sent",
      review: review
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to get review", 401));
  }
}

exports.addReview = async (req, res, next) => {
  const userData = req.user;
  const {isbn} = req.params;
  const {wholeNumber, decimalNumber, text} = req.body;

  if(!isbn || !wholeNumber || !decimalNumber) {
    return next(new ErrorResponse("All required fields were not provided", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to add review", 401));
    }

    if(!(await checkBook(userData._id, isbn))) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    if((await checkReview(userData._id, isbn)).length !== 0) {
      return next(new ErrorResponse("This book already has a review"));
    }

    // Add review
    await User.updateOne(
      {$and: [
        {"_id": userData._id},
        {"library.books.isbn.identifier": {$eq: isbn}}
      ]},
      {$set: {
        "library.books.$.review": {
          "rating.wholeNumber": parseInt(wholeNumber),
          "rating.decimalNumber": parseInt(decimalNumber),
          "text": text
        }
      }}
    );

    res.status(200).json({
      success: true,
      message: "Review has been added"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to add review", 401));
  }
}

exports.editReview = async (req, res, next) => {
  const userData = req.user;
  const {isbn} = req.params;
  const {wholeNumber, decimalNumber, text} = req.body;

  if(!isbn || !wholeNumber || !decimalNumber) {
    return next(new ErrorResponse("All required fields were not provided", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to edit review", 401));
    }

    if(!(await checkBook(userData._id, isbn))) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    if((await checkReview(userData._id, isbn)).length === 0) {
      return next(new ErrorResponse("This book does not have a review"));
    }

    // Edit review
    await User.updateOne(
      {$and: [
        {"_id": userData._id},
        {"library.books.isbn.identifier": {$eq: isbn}}
      ]},
      {$set: {
        "library.books.$.review": {
          "rating.wholeNumber": parseInt(wholeNumber),
          "rating.decimalNumber": parseInt(decimalNumber),
          "text": text
        }
      }}
    );

    res.status(200).json({
      success: true,
      message: "Review has been edited"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Faile to edit review", 401));
  }
}

exports.deleteReview = async (req, res, next) => {
  const userData = req.user;
  const {isbn} = req.params;

  if(!isbn) {
    return next(new ErrorResponse("Please provide an ISBN", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to delete review", 401));
    }

    if(!(await checkBook(userData._id, isbn))) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    if((await checkReview(userData._id, isbn)).length === 0) {
      return next(new ErrorResponse("This book does not have a review"));
    }

    // Delete review
    await User.updateOne(
      {$and: [
        {"_id": userData._id},
        {"library.books.isbn.identifier": {$eq: isbn}}
      ]},
      {$set: {
        "library.books.$.review": {
          "rating.wholeNumber": -1,
          "rating.decimalNumber": -1,
          "text": ""
        }
      }}
    );

    res.status(200).json({
      success: true,
      message: "Review has been deleted"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to delete review", 401));
  }
}
