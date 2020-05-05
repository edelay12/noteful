import React from "react";
import { DATABASE_URL } from "../../config";
import { NavLink } from "react-router-dom";
import mainContext from "./../../Context";
import propTypes from "prop-types";

export default class NoteAreaFolder extends React.Component {
  static contextType = mainContext;

  componentDidMount() {
    fetch(`${DATABASE_URL}/notes`)
      .then(Response => {
        if (Response.ok) {
          return Response.json();
        }
        throw new Error(Response.statusText);
      })
      .then(ResponsJson => {
        this.context.updateNotes(ResponsJson);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    let arr = this.context.state.notes.filter(item => {
      return item.foldernum === this.props.selId;
    });
    return (
      <div className='column'>
        <div className='notesContainer'>
        {arr.map(note => (
             
          <li id='noteLi' key={note.id}>
           <NavLink to={`/note/${note.id}`} onClick={() => this.props.click(note.id, note.foldernum)}>
              <h3 >
                {note.name}
              </h3>{" "}
            <h6 className='noteModified'>
              {" "}
              Date modified: <br />
              {note.modified}
            </h6>
            </NavLink>
            <button
              className="deleteNoteButton"
              onClick={() => this.context.del(note.id)}
              value={note.id}
            >
              X
            </button>
          </li>
        ))}
        </div>
        <button className="newNoteButton" onClick={this.props.noteAdd}>
                Add Note
              </button>
      </div>
    );
  }
}

NoteAreaFolder.propTypes = {
  value: propTypes.string,
  selId: propTypes.number,
  click : propTypes.func,
};
