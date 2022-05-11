import React from "react";

function Note(noteProps) {
  // Props
  const {note, setNote} = noteProps;

  return (
    <div className="Note mt-3">
      <p className="mb-1">Note</p>
      <textarea className="form-control" id="note" placeholder="Add a note" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
    </div>
  );
}

export default Note;
