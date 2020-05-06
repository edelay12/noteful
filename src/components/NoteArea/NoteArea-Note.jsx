import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from 'prop-types';

export default class NoteAreaNote extends Component {
  state = {
    note: []
  };

  componentDidMount() {
    let arr = this.props.notes.filter(item => {
      return item.id === this.props.selId;
    });

    this.setState({ note: arr });
  }
  render() {
    return (
      <>
        {this.state.note.map(note => (
          <>
            <div className="note">
              <h3 className="nName">{note.name}</h3>
              <h6 className="dModified">
                {" "}
                Date modified: <br />
                {note.modified}
              </h6>
              <button
                className="deleteNoteButton"
                value={note.id}
                onClick={() => this.props.del(note.id)}
              >
                X
              </button>
            </div>

            <section className="contentContainer">
              <h3 className="content">{note.content}</h3>
            </section>
            <Link className="editNoteButton" to={`/note/${note.id}/edit`}>
              Edit note
            </Link>
          </>
        ))}
      </>
    );
  }
}

NoteAreaNote.propTypes = {
  selId : propTypes.number,
  del : propTypes.func
 }