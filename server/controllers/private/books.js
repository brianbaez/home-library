const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const {checkUser, checkBook} = require("./helper");

exports.getBook = async (req, res, next) => {
  const userData = req.user;
  const {isbn} = req.params;

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to get book", 401));
    }

    let books = undefined;

    // Get all books if no isbn is provided
    if(!isbn) {
      const {library} = await User.findOne(
        {"_id": userData._id}
      );

      books = library.books;
    }
    // Only get the book that matches the ISBN
    else {
      const {library} = await User.findOne(
        {$and: [
          {"_id": userData._id},
          {"library.books.isbn": {$eq: isbn}}
        ]},
        {"library.books.$": 1}
      );

      books = library.books;
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
  const {title, author, pages, description, isbn, bookshelves, journal} = req.body;

  if(!title || !author || !pages || !isbn) {
    return next(new ErrorResponse("All required fields were not provided", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to add book", 401));
    }

    if(await checkBook(userData._id, isbn)) {
      return next(new ErrorResponse("This book is already in your library", 409));
    }

    // Add book to books array
    await User.updateOne(
      {"_id": userData._id},
      {$push: {
        "library.books": {
          "title": title,
          "author": author,
          "pages": pages,
          "description": description,
          "isbn": isbn,
          "bookshelves": bookshelves,
          "journal": journal
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
        "library.books": {"isbn": {$eq: isbn}}
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
