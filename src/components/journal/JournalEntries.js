import React from "react";

// Components
import EntryCard from "./EntryCard";
import AddEntryButton from "./AddEntryButton";

function JournalEntries(journalEntriesProps) {
  // Props
  const {isbn, book, journal, error} = journalEntriesProps;

  const entryCardProps = {isbn, pages: book.pages};

  return (
    <div className="JournalEntries">
      {error && <span>{error}</span>}
      {journal && journal.map((entry) => {
        return (
          <EntryCard  entry={entry} {...entryCardProps}/>
        );
      })}
      <AddEntryButton isbn={isbn}/>
    </div>
  );
}

export default JournalEntries;
