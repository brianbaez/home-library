import React from "react";

function Note(noteProps) {
  // Props
  const {note, setNote} = noteProps;

  return (
    <div className="Note mt-3">
      <h4>Note</h4>
      <textarea className="form-control" id="note" placeholder="Add a note" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
    </div>
  );
}

export default Note;
