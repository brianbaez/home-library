const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const {checkUser, checkBook, checkBookshelf} = require("./helper");

exports.getBookshelf = async (req, res, next) => {
  const userData = req.user;
  const {name} = req.params;

  if(!name) {
    return next(new ErrorResponse("Please provide a bookshelf name", 400));
  }

  try{
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to get bookshelf", 401));
    }

    // Get all books in the bookshelf
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
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to add to bookshelf", 401));
    }

    if(!(await checkBook(userData._id, isbn))) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    if((await checkBookshelf(userData._id, isbn, bookshelfName)).length !== 0) {
      return next(new ErrorResponse("This book is already in that bookshelf", 409));
    }

    // Add book to bookshelf
    await User.updateOne(
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
      message: "Book has been added to the bookshelf",
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
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to delete from bookshelf", 401));
    }

    if(!(await checkBook(userData._id, isbn))) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    if((await checkBookshelf(userData._id, isbn, bookshelfName)).length === 0) {
      return next(new ErrorResponse("This book is not in that bookshelf", 404));
    }

    // Delete book from bookshelf
    await User.updateOne(
      {$and: [
        {"_id": userData._id},
        {"library.books.isbn": {$eq: isbn}}
      ]},
      {$pull: {
        "library.books.$.bookshelves": {$eq: bookshelfName}
      }}
    );

    res.status(200).json({
      success: true,
      message: "Book has been deleted from bookshelf"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to delete from bookshelf", 401));
  }
}
