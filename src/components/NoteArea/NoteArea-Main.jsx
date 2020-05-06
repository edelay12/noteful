import React from "react";
import "../NoteArea/NoteArea.css";
import { NavLink } from "react-router-dom";
import propTypes from 'prop-types';

export default function NoteArea(props) {
  return (
        <>
          {props.notes.map(note => (
            <li id="noteLi" key={note.id}>
              <NavLink
                to={`/note/${note.id}`}
                onClick={() => props.click(note.id, note.foldernum)}
              >
                <h3 className="noteLabel">{note.name}</h3>
                <h6 className="noteModified">
                  {" "}
                  Date modified: <br />
                  {note.modified}
                </h6>
              </NavLink>
              <button
                className="deleteNoteButton"
                value={note.id}
                onClick={() => props.del(note.id)}
              >
                X
              </button>
            </li>
          ))}
        </>
  );
}


NoteArea.propTypes = {
 click : propTypes.func,
 notes : propTypes.array
}