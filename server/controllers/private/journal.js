const mongoose = require("mongoose");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const {checkUser, checkBook, checkJournal, getJournal, getLastEntry} = require("./helper");

exports.getJournalEntry = async (req, res, next) => {
  const userData = req.user;
  const {isbn} = req.params;

  if(!isbn) {
    return next(new ErrorResponse("Please provide an ISBN", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to get journal entries", 401));
    }

    if(!(await checkBook(userData._id, isbn))) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    const journal = await getJournal(userData._id, parseInt(isbn));

    res.status(200).json({
      success: true,
      message: "Journal entries have been sent",
      journal: journal
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to get journal entries", 401));
  }
}

exports.addJournalEntry = async (req, res, next) => {
  const userData = req.user;
  const {isbn} = req.params;
  const {month, day, year, pagesReadSession, note} = req.body;

  if(!isbn || !month || !day || !year || !pagesReadSession) {
    return next(new ErrorResponse("All required fields were not provided", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to get journal entries", 401));
    }

    if(!(await checkBook(userData._id, isbn))) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    // Get last entry's total pages
    const lastEntry = await getLastEntry(userData._id, parseInt(isbn));

    var pagesTotal;

    // Set/update book's total pages read
    if(!lastEntry[0].pagesTotal) {
      pagesTotal = pagesReadSession;
    }
    else {
      pagesTotal = lastEntry[0].pagesTotal + pagesReadSession;
    }

    // Add journal entry
    await User.updateOne(
      {$and: [
        {"_id": userData._id},
        {"library.books.isbn": {$eq: isbn}}
      ]},
      {$push: {
        "library.books.$.journal": {
          "date.month": month,
          "date.day": day,
          "date.year": year,
          "pagesReadSession": pagesReadSession,
          "pagesReadTotal": pagesTotal,
          "note": note
        }
      }}
    );

    res.status(200).json({
      success: true,
      message: "Journal entry has been added"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to add journal entry", 401));
  }
}

exports.editJournalEntry = async (req, res, next) => {
  const userData = req.user;
  const {isbn, entryID} = req.params;
  const {month, day, year, pagesReadSession, pagesReadTotal, note} = req.body;

  if(!isbn || !entryID || !month || !day || !year || !pagesReadSession || !pagesReadTotal) {
    return next(new ErrorResponse("All required fields were not provided", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to edit journal entry", 401));
    }

    if(!(await checkBook(userData._id, isbn))) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    if((await checkJournal(userData._id, parseInt(isbn), mongoose.Types.ObjectId(entryID))).length === 0) {
      return next(new ErrorResponse("There is no entry with this ID in this book", 404));
    }

    // Edit journal entry
    await User.updateOne(
      {$and: [
        {"_id": userData._id},
        {"library.books.isbn": {$eq: isbn}},
        {"library.books.journal._id": {$eq: entryID}}
      ]},
      {$set: {
        "library.books.$.journal.$[entry]": {
          "date.month": month,
          "date.day": day,
          "date.year": year,
          "pagesReadSession": pagesReadSession,
          "pagesReadTotal": pagesReadTotal,
          "note": note,
          "_id": entryID
        }
      }},
      {arrayFilters: [{"entry._id": entryID}]}
    );

    res.status(200).json({
      success: true,
      message: "Journal entry has been edited"
    });

  }
  catch(error) {
    return next(new ErrorResponse("Failed to edit journal entry", 401));
  }
}

exports.deleteJournalEntry = async (req, res, next) => {
  const userData = req.user;
  const {isbn, entryID} = req.params;

  if(!isbn || !entryID) {
    return next(new ErrorResponse("Please provide an ISBN and entry ID", 400));
  }

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to edit journal entry", 401));
    }

    if(!(await checkBook(userData._id, isbn))) {
      return next(new ErrorResponse("This book is not in your library", 404));
    }

    if((await checkJournal(userData._id, parseInt(isbn), mongoose.Types.ObjectId(entryID))).length === 0) {
      return next(new ErrorResponse("There is no entry with this ID in this book", 404));
    }

    // // Delete journal entry
    await User.updateOne(
      {$and: [
        {"_id": userData._id},
        {"library.books.isbn": {$eq: isbn}}
      ]},
      {$pull: {
        "library.books.$.journal": {"_id": {$eq: entryID}}
      }}
    );

    res.status(200).json({
      success: true,
      message: "Journal entry has been deleted"
    });
  }
  catch(error) {
    return next(new ErrorResponse("Failed to delete journal entry", 401));
  }
}
