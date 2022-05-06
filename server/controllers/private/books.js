const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const {checkUser, checkBook} = require("./helper");

exports.getBook = async (req, res, next) => {
  const userData = req.user;
  const {isbn} = req.params;

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to get books", 401));
    }

    var books;

    // Get all books if no ISBN is provided
    if(!isbn) {
      books = await User.aggregate([
        {$match: {"_id": userData._id}},
        {$unwind: "$library.books"},
        {$group: {
          "_id": "$_id",
          "books": {$push: "$library.books"}
        }},
        {$project: {"books": 1, "_id": 0}}
      ]);
    }
    // Only get the book that matches the ISBN
    else {
      if(!(await checkBook(userData._id, isbn))) {
        return next(new ErrorResponse("This book is not in your library", 404));
      }

      books = await User.aggregate([
        {$match: {"_id": userData._id}},
        {$unwind: "$library.books"},
        {$unwind: "$library.books.isbn"},
        {$match: {
          "library.books.isbn.identifier": {$eq: isbn}
        }},
        {$group: {
          "_id": "$_id",
          "books": {$push: "$library.books"}
        }},
        {$project: {"books": 1, "_id": 0}}
      ]);
    }

    res.status(200).json({
      success: true,
      message: "Books have been sent",
      data: books
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to get books", 401));
  }
}

exports.addBook = async (req, res, next) => {
  const userData = req.user;
  const {isbnToAdd} = req.params;
  const {title, authors, description, isbn, pages, cover, status} = req.body;


  if(!title || !authors || !isbn || !pages) {
    return next(new ErrorResponse("All required fields were not provided", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to add book", 401));
    }

    if(await checkBook(userData._id, isbnToAdd)) {
      return next(new ErrorResponse("This book is already in your library", 409));
    }

    // Add book to books array
    await User.updateOne(
      {"_id": userData._id},
      {$push: {
        "library.books": {
          "title": title,
          "authors": authors,
          "description": description,
          "isbn": isbn,
          "pages": pages,
          "cover": cover,
          "status": status
        }
      }}
    );

    res.status(200).json({
      success: true,
      message: "Book has been added"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to add book", 401));
  }
}

exports.editBook = async (req, res, next) => {
  const userData = req.user;
  const {isbn} = req.params;
  const {status, yearRead} = req.body;

  if(!isbn || (!status && !yearRead)) {
    return next(new ErrorResponse("All required fields were not provided", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to edit book", 401));
    }

    if(!(await checkBook(userData._id, isbn))) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    if(status) {
      // Edit book status
      await User.updateOne(
        {$and: [
          {"_id": userData._id},
          {"library.books.isbn.identifier": {$eq: isbn}}
        ]},
        {$set: {"library.books.$.status": status}}
      );
    }

    if(yearRead) {
      // Edit year read
      await User.updateOne(
        {$and: [
          {"_id": userData._id},
          {"library.books.isbn.identifier": {$eq: isbn}}
        ]},
        {$set: {"library.books.$.yearRead": yearRead}}
      );
    }

    res.status(200).json({
      success: true,
      message: "Book has been edited"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to edit book", 401));
  }
}

exports.deleteBook = async (req, res, next) => {
  const userData = req.user;
  const {isbn} = req.params;

  if(!isbn) {
    return next(new ErrorResponse("Please provide an ISBN", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to delete book", 401));
    }

    if(!(await checkBook(userData._id, isbn))) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    // Delete book from books array
    await User.updateOne(
      {"_id": userData._id},
      {$pull: {
        "library.books": {"isbn.identifier": {$eq: isbn}}
      }}
    );

    res.status(200).json({
      success: true,
      message: "Book has been deleted"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to delete book", 401));
  }
}
