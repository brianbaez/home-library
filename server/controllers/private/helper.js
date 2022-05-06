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
      {"library.books.isbn.identifier": {$eq: isbn}}
    ]}
  );
}

// Check if review exists
exports.checkReview = async (id, isbn) => {
  return await User.aggregate([
    {$match: {"_id": id}},
    {$unwind: "$library.books"},
    {$match: {
      "library.books.isbn.identifier": {$eq: isbn},
      "library.books.review.rating.wholeNumber": {$ne: -1},
      "library.books.review.rating.decimalNumber": {$ne: -1}
    }}
  ]);
}

// Check if book is already in the bookshelf
exports.checkBookshelf = async (id, isbn, bookshelfName) => {
  const deleted = await User.aggregate([
    {$match: {"_id": id}},
    {$unwind: "$library.books"},
    {$unwind: "$library.books.isbn"},
    {$match: {
      "library.books.isbn.identifier": {$eq: isbn}
    }},
    {$match: {
      "library.books.bookshelves": {$eq: bookshelfName}
    }}
  ]);

  return deleted;
}

// Check if challenge for a year exists
exports.checkChallenge = async (id, year) => {
  return await User.aggregate([
    {$match: {"_id": id}},
    {$unwind: "$challenges"},
    {$match: {"challenges.year": {$eq: year}}}
  ]);
}

// Check if entry exists in journal
exports.checkJournal = async (id, isbn, entryID) => {
  return await User.aggregate([
    {$match: {"_id": id}},
    {$unwind: "$library.books"},
    {$match: {"library.books.isbn.identifier": {$eq: isbn}}},
    {$unwind: "$library.books.journal"},
    {$match: {"library.books.journal._id": entryID}}
  ]);
}

// Get all journal entries
exports.getJournal = async (id, isbn) => {
  return await User.aggregate([
    {$match: {"_id": id}},
    {$unwind: "$library.books"},
    {$match: {"library.books.isbn.identifier": {$eq: isbn}}},
    {$unwind: "$library.books.journal"},
    {$group: {
      "_id": "$_id",
      "entries": {$push: "$library.books.journal"}
    }},
    {$project: {"entries": 1, "_id": 0}}
  ]);
}

// Get last journal entry
exports.getLastEntry = async (id, isbn) => {
  return await User.aggregate([
    {$match: {"_id": id}},
    {$unwind: "$library.books"},
    {$unwind: "$library.books.isbn"},
    {$match: {
      "library.books.isbn.identifier": {$eq: isbn}
    }},
    {$project: {
      "pagesTotal": {$last: "$library.books.journal.pagesReadTotal"}
    }},
    {$unwind: "$pagesTotal"}
  ]);
}
