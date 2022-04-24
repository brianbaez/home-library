const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/auth");
const {getJournalEntry, addJournalEntry, editJournalEntry, deleteJournalEntry} = require("../../controllers/private/journal");

// Get journal entries
router.route("/journal/:isbn").get(protect, getJournalEntry);

// Add journal entry
router.route("/journal/:isbn").post(protect, addJournalEntry);

// Edit journal entry
router.route("/journal/:isbn/:entryID").put(protect, editJournalEntry);

// Delete journal entry
router.route("/journal/:isbn/:entryID").delete(protect, deleteJournalEntry);

module.exports = router;
