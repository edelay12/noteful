import React from "react";
import "./NoteArea.css";

export default class NewNote extends React.Component {
  constructor(props) {
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
        value: "",
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
    if (this.state.name.touched) {
      this.setState({ name: { throw: false } });
      console.log("new note submit");

      console.log(this.state.name.value);

      fetch(`http://localhost:9090/notes`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name.value,
          content: this.state.content.value,
          folderId: this.state.folder.value
        })
      })
        .then(Response => {
          if (Response.ok) {
            console.log(Response);
            this.notesUpdate();
            return this.props.toggleNotes();
          }
          throw new Error(Response.statusText);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return this.setState({ name: { throw: true } });
    }
  };
  notesUpdate = e => {
    fetch("http://localhost:9090/notes")
      .then(Response => {
        if (Response.ok) {
          return Response.json();
        }
        throw new Error(Response.statusText);
      })
      .then(ResponseJson => {
        console.log("new note update--");
        return this.props.notes(ResponseJson);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    //get folder list
  }

  render() {
    return (
      <div className="newNoteForm">
        <form className="noteForm" onSubmit={this.handleSubmit}>
          <p>Name</p>
          <input
            onChange={e => this.handleChange(e.target.value)}
            type="text"
          />
          {this.state.name.throw && (
            <p style={{ color: "red" }} className="nameErrorText">
              Please include a name
            </p>
          )}
          <p>Content</p>
          <input
            onChange={e => this.contentChange(e.target.value)}
            type="text"
          />

          <select
            onChange={e => this.selectChange(e.target.value)}
            className="noteSelect"
          >
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
