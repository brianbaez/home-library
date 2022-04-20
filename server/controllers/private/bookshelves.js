const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");

exports.getBookshelf = async (req, res, next) => {
  const userData = req.user;
  const {name} = req.params;

  if(!name) {
    return next(new ErrorResponse("Please provide a bookshelf name", 400));
  }

  try{
    // Check if user matches
    const user = await User.findOne({"_id": userData._id});

    if(!user) {
      return next(new ErrorResponse("Failed to get bookshelf", 401));
    }

    // Check if any books are in the bookshelf
    const bookshelf = await User.aggregate([
      {$match: {"_id": userData._id}},
      {$unwind: "$library.books"},
      {$match: {
        "library.books.bookshelves": {$eq: name}
      }},
      {$group: {
        "_id": "$_id",
        "books": {$push: "$library.books"}
      }},
      {$project: {"books": 1, "_id": 0}}
    ]);

    if(bookshelf.length === 0) {
      return next(new ErrorResponse("There are no books in this bookshelf", 404));
    }

    res.status(200).json({
      success: true,
      message: "Books in bookshelf have been sent",
      data: bookshelf
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to get bookshelf", 401));
  }
}

exports.addToBookshelf = async (req, res, next) => {
  const userData = req.user;
  const {isbn, bookshelfName} = req.body;

  if(!isbn || !bookshelfName) {
    return next(new ErrorResponse("Please provide an ISBN and bookshelf name", 400));
  }

  try {
    // Check if user matches
    const user = await User.findOne({"_id": userData._id});

    if(!user) {
      return next(new ErrorResponse("Failed to add to bookshelf", 401));
    }

    // Check if book already exists
    const bookExists = await User.findOne(
      {$and: [
        {"_id" : userData._id},
        {"library.books.isbn": {$eq: isbn}}
      ]}
    );

    if(!bookExists) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    // Check if book is already in that bookshelf
    const findBook = await User.aggregate([
      {$match: {"_id": userData._id}},
      {$unwind: "$library.books"},
      {$match: {
        "library.books.isbn": {$eq: isbn},
        "library.books.bookshelves": {$eq: bookshelfName}
      }}
    ]);

    if(findBook.length !== 0) {
      return next(new ErrorResponse("This book is already in that bookshelf", 409));
    }

    const addBookshelf = await User.updateOne(
      {$and: [
        {"_id": userData._id},
        {"library.books.isbn": {$eq: isbn}}
      ]},
      {$push: {
        "library.books.$.bookshelves": bookshelfName
      }}
    );

    res.status(200).json({
      success: true,
      message: "Book has been added to the bookshelf"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to add to bookshelf", 401));
  }
}

exports.deleteFromBookshelf = async (req, res, next) => {
  const userData = req.user;
  const {isbn, bookshelfName} = req.body;

  if(!isbn || !bookshelfName) {
    return next(new ErrorResponse("Please provide an ISBN and bookshelf name", 400));
  }

  try{
    // Check if user matches
    const user = await User.findOne({"_id": userData._id});

    if(!user) {
      return next(new ErrorResponse("Failed to remove from bookshelf", 401));
    }

    // Check if book already exists
    const bookExists = await User.findOne(
      {$and: [
        {"_id" : userData._id},
        {"library.books.isbn": {$eq: isbn}}
      ]}
    );

    if(!bookExists) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    // Check if book is in the bookshelf
    const findBook = await User.aggregate([
      {$match: {"_id": userData._id}},
      {$unwind: "$library.books"},
      {$match: {
        "library.books.isbn": {$eq: isbn},
        "library.books.bookshelves": {$eq: bookshelfName}
      }}
    ]);

    if(findBook.length === 0) {
      return next(new ErrorResponse("This book is not in that bookshelf", 409));
    }

    const deleteBookshelf = await User.updateOne(
      {$and: [
        {"_id": userData._id},
        {"library.books.isbn": {$eq: isbn}}
      ]},
      {$pull: {
        "library.books.$.bookshelves": bookshelfName
      }}
    );

    res.status(200).json({
      success: true,
      message: "Book has been removed from bookshelf"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to remove from bookshelf", 401));
  }
}
