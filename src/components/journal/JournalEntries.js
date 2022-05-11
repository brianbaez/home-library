import React from "react";

// Components
import EntryCard from "./EntryCard";
import AddEntryButton from "./AddEntryButton";

function JournalEntries(journalEntriesProps) {
  // Props
  const {isbn, book, journal, error} = journalEntriesProps;

  const entryCardProps = {isbn, pages: book.pages};

  return (
    <div className="JournalEntries mt-3">
      {error && <span>{error}</span>}
      {journal && journal.map((entry, index) => {
        return (
          <EntryCard key={index} entry={entry} {...entryCardProps}/>
        );
      })}
      <AddEntryButton isbn={isbn}/>
    </div>
  );
}

export default JournalEntries;
