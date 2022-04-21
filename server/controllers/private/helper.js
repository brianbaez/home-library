const User = require("../../models/User");

// Check is user matches
exports.checkUser = async (id) => {
  return await User.findOne({"_id": id});
}

// Check if book exists in library
exports.checkBook = async (id, isbn) => {
  return await User.findOne(
    {$and: [
      {"_id": id},
      {"library.books.isbn": {$eq: isbn}}
    ]}
  );
}

// Check if book is already in the bookshelf
exports.checkBookshelf = async (id, isbn, bookshelfName) => {
  return await User.aggregate([
    {$match: {"_id": id}},
    {$unwind: "$library.books"},
    {$match: {
      "library.books.isbn": {$eq: isbn},
      "library.books.bookshelves": {$eq: bookshelfName}
    }}
  ]);
}
