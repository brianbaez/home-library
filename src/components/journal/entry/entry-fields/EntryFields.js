import React from "react";

// Components
import Date from "./date/Date";
import PagesReadSession from "./PagesReadSession";
import PagesReadTotal from "./PagesReadTotal";
import Note from "./Note";
import SaveButton from "../../../SaveButton";
import DeleteEntry from "./DeleteEntry";

function EntryFields(entryFieldsProps) {
  // Props
  const {handler, deleteHandler, book, isbn, entry, month, setMonth, day, setDay, year, setYear, pagesReadSession, setPagesReadSession, pagesReadTotal, setPagesReadTotal, minTotalPages, note, setNote, success, error} = entryFieldsProps;

  const dateProps = {month, setMonth, day, setDay, year, setYear};
  const pagesReadSessionProps = {minTotalPages, maxPages: book.pages, pagesReadSession, setPagesReadSession};
  const pagesReadTotalProps = {minTotalPages, maxTotalPages: book.pages, pagesReadTotal, setPagesReadTotal};
  const noteProps = {note, setNote};
  
  const saveButtonProps = {success, error};

  return (
    <form className="EntryFields" onSubmit={handler}>
      <hr className="my-3"></hr>
      <Date {...dateProps}/>
      <PagesReadSession {...pagesReadSessionProps}/>
      <PagesReadTotal {...pagesReadTotalProps}/>
      <Note {...noteProps}/>
      <div className="mt-3">
        <SaveButton {...saveButtonProps}/>
      </div>
      {entry
        ? <DeleteEntry deleteHandler={deleteHandler}/>
        : <div className="CancelEntry">
            <hr className="mt-3 mb-3"></hr>
            <a className="m-0" href={`/journal/${isbn}`}>Cancel</a>
          </div>
      }
    </form>
  );
}

export default EntryFields;
