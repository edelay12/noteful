import React from "react";
import { DATABASE_URL } from "../../config";
import "../NoteArea/NoteArea.css";
import propTypes from 'prop-types';

export default class NewNote extends React.Component {
  constructor() {
    super();
    this.state = {
      name: {
        value: "",
        touched: false,
        throw: false
      },
      content: {
        value: "",
        touched: false
      },
      folder: {
        value: 1,
        touched: false
      },
      folders: null
    };
  }

  handleChange = e => {
    this.setState({ name: { value: e, touched: true } });
  };
  contentChange = e => {
    this.setState({ content: { value: e, touched: true } });
  };
  selectChange = e => {
    this.setState({ folder: { value: e, touched: true } });
  };

  handleSubmit = e => {
    //need to verify fields
    e.preventDefault();
    if (this.state.name.touched == false) {
      return this.setState({ name: { throw: true } });
    } else if (this.state.folder.touched == false) {
      return this.setState({ folder: { throw: true } });
    } else {
      fetch(`${DATABASE_URL}/notes`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name.value,
          content: this.state.content.value,
          foldernum: this.state.folder.value
        })
      })
        .then(Response => {
          if (Response.ok) {
            this.notesUpdate();
            return this.props.toggleNotes();
          }
          throw new Error(Response.statusText);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    this.setState({
      name: {
        value: "",
        touched: false,
        throw: false
      },
      content: {
        value: "",
        touched: false
      },
      folder: {
        value: 1,
        touched: false
      },
      folders: null
    });
  }

  notesUpdate = e => {
    fetch(`${DATABASE_URL}/notes`)
      .then(Response => {
        if (Response.ok) {
          return Response.json();
        }
        throw new Error(Response.statusText);
      })
      .then(ResponseJson => {
        return this.props.notesUpdate(ResponseJson);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //

  render() {
    return (
      <div className="newNoteForm">
        <form className="noteForm" onSubmit={this.handleSubmit}>
          <p>Name</p>
          <input
            className="nameInput"
            onChange={e => this.handleChange(e.target.value)}
            type="text"
          />
          {this.state.name.throw && (
            <p style={{ color: "red" }} className="nameErrorText">
              Please include a name
            </p>
          )}
          <p>Content</p>
          <textarea
            className="contentInput"
            onChange={e => this.contentChange(e.target.value)}
            type="text"
          />

          {this.state.folder.throw && (
            <p style={{ color: "red" }} className="nameErrorText">
              Please select a folder
            </p>
          )}
          <select
            onChange={e => this.selectChange(e.target.value)}
            className="noteSelect"
          >
            <option defaultValue value={null}>
              Please select a folder...
            </option>
            {this.props.folders.map(item => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
          <button type="submit" className="newNoteSubmit">
            Submit
          </button>
        </form>
        <span
          className="closeForm"
          type="button"
          onClick={this.props.toggleNotes}
        >
          X
        </span>
      </div>
    );
  }
}

NewNote.propTypes = {
  folders: propTypes.array,
  toggleNotes : propTypes.func,
  notesUpdate : propTypes.func
}