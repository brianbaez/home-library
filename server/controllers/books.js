const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

exports.getBook = async (req, res, next) => {
  const userData = req.user;
  const {isbn} = req.params;

  try {
    // Check if user matches
    const user = await User.findOne({"_id": userData._id});

    if(!user) {
      return next(new ErrorResponse("Failed to get book", 401));
    }

    let books = undefined;

    // get all books if no isbn provided
    if(!isbn) {
      const {library} = await User.findOne(
        {"_id": userData._id}
      );

      books = library.books;
    }
    // only get the book that matches with the isbn
    else {
      try {
        const {library} = await User.findOne(
          {$and: [{"_id": userData._id}, {"library.books.isbn": {$eq: isbn}}]},
          {"library.books.$": 1}
        );

        books = library.books;
      }
      catch(error) {
        return next(new ErrorResponse("This book is not in your library", 404));
      }
    }

    res.status(200).json({
      success: true,
      message: "Your books are available here",
      data: books
    });
  }
  catch(error) {
    return next(error);
  }
}

exports.addBook = async (req, res, next) => {
  const userData = req.user;
  const {title, author, pages, description, isbn, bookshelves} = req.body;

  if(!title || !author || !pages || !isbn) {
    return next(new ErrorResponse("Failed to add book", 401));
  }

  try {
    // Check if user matches
    const user = await User.findOne({"_id" : userData._id});

    if(!user) {
      return next(new ErrorResponse("Failed to add book", 401));
    }

    // Check if book already exists
    const book = await User.findOne({$and: [{"_id" : userData._id}, {"library.books.isbn": {$eq: isbn}}]});

    if(book) {
      return next(new ErrorResponse("This book is already in your library", 409));
    }

    // Update/add to books array
    const add = await User.updateOne(
      {"_id": userData._id},
      {$push: {
        "library.books": {
          "title": title,
          "author": author,
          "pages": pages,
          "description": description,
          "isbn": isbn,
          "bookshelves": bookshelves
        }
      }}
    );

    res.status(200).json({
      success: true,
      message: "Book has been added",
      title: title
    });
  }
  catch(error) {
    return next(error);
  }
}

exports.deleteBook = async (req, res, next) => {
  const userData = req.user;
  const {isbn} = req.params;

  try {
    // Check if user matches
    const user = await User.findOne({"_id" : userData._id});

    if(!user) {
      return next(new ErrorResponse("Failed to remove book", 401));
    }

    // Check if book exists
    const book = await User.findOne({$and: [{"_id" : userData._id}, {"library.books.isbn": {$eq: isbn}}]});

    if(!book) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    try {
      const deleteBook = await User.updateOne(
        {"_id": userData._id},
        {$pull: {
          "library.books": {isbn: isbn}
        }}
      );

      res.status(200).json({
        success: true,
        message: "Book has been deleted"
      });
    }
    catch(error) {
      return next(new ErrorResponse("Failed to remove book", 401));
    }
  }
  catch(error) {
    return next(error);
  }
}
