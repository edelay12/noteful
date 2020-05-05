import React, { Component } from "react";
import { DATABASE_URL } from "../../config";
import "./EditNote.css";
import NotesApiService from "../../services/note-api-service";
import propTypes from 'prop-types';
export default class EditNote extends Component {
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
      folders: []
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
    console.log("submit");
    e.preventDefault();
    if (!this.state.name.value) {
      return this.setState({ name: { throw: true } });
    } else if (this.state.folder.touched == false) {
      return this.setState({ folder: { throw: true } });
    } else {
      fetch(`${DATABASE_URL}/notes/${this.props.selId}`, {
        method: "PATCH",
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
            return this.notesUpdate();
          }
          throw new Error(Response.statusText);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    console.log(this.props.selId);
    NotesApiService.getNoteId(this.props.selId).then(res => {
      console.log(res);
      this.setState({
        name: {
          value: res.name,
          touched: false,
          throw: false
        },
        content: {
          value: res.content,
          touched: false
        },
        folder: {
          value: 1,
          touched: false
        },
        folders: []
      });
      console.log(this.state);
    });
  }

  notesUpdate = () => {
    NotesApiService.getNotes()
      .then(ResponseJson => {
        return this.props.notesUpdate(ResponseJson);
      })
      .then(this.props.history.goBack)
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="editNoteForm">
        <h1>Edit Note: {this.state.name.value}</h1>
        <form className="editNoteForm" onSubmit={this.handleSubmit}>
          <p>Name</p>
          <input
            className="nameInput"
            onChange={e => this.handleChange(e.target.value)}
            type="text"
            defaultValue={this.state.name.value}
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
            defaultValue={this.state.content.value}
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
      </div>
    );
  }
}


EditNote.propTypes = {
  folders : propTypes.array,
  selId : propTypes.number,
  updateNotes: propTypes.func

}