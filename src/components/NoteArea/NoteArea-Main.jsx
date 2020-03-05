import React from "react";
import "../NoteArea/NoteArea.css";
import mainContext from "./../../Context";

export default function NoteArea(props) {
  return (
    <mainContext.Consumer>
      {mainContext => (
        <>
          {mainContext.state.notes.map(note => (
            <li id="noteLi" key={note.id}>
              <h3 className="noteLabel">{note.name}</h3>
              <h6 classname='noteModified'>
                {" "}
                Date modified: <br />
                {note.modified}
              </h6>
              <button
                className="deleteNoteButton"
                value={note.id}
                onClick={() => mainContext.del(note.id)}
              >
                X
              </button>
            </li>
          ))}
        </>
      )}
    </mainContext.Consumer>
  );
}
