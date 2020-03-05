import React, { useState } from "react";
import { DATABASE_URL } from "./config";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar/SideBar-Main";
import NoteArea from "./components/NoteArea/NoteArea-Main";
import NoteAreaFolder from "./components/NoteArea/NoteArea-Folder";
import NoteAreaNote from "./components/NoteArea/NoteArea-Note";
import Store from "./Store";
import SideBarFolder from "./components/SideBar/SideBar-Folder";
import contextMain from "./Context";
import NewFolder from "./components/SideBar/NewFolder";
import NewNote from "./components/NoteArea/newNote";
import HandleError from "./components/handleError";
import FolderService from "./services/folder-api-service";
import NoteService from "./services/note-api-service";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      notes: [],
      show: false,
      showNote: false,
      selFolder: null,
      selNote: null,
      folderAdd: null,
      selNoteFolder: null,
      foldersToggle: false,
    };
  }

  noteAdd = () => {
    this.setState({ showNote: !this.state.showNote });
  };

  folderAdd = e => {
    this.setState({ show: !this.state.show });
  };

  componentDidMount() {
    NoteService.getNotes()
      .then(ResponseJson => {
        console.log(ResponseJson);
        this.notesUpdate(ResponseJson);
      })
      .catch(err => {
        console.log(err);
      });

    FolderService.getFolders()
      .then(ResponseJson => {
        this.folderUpdate(ResponseJson);
      })
      .catch(err => {
        console.log(err);
      });
  }

  folderClick = e => {
    this.setState({ selFolder: e });
  };

  noteClick = (e, l) => {
    this.setState({
      selNote: e,
      selNoteFolder: l
    });
  };

  updateFolders = () => {
    FolderService.getFolders()
      .then(ResponsJson => {
        return this.folderUpdate(ResponsJson);
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateNotes = () => {
    NoteService.getNotes()
      .then(ResponsJson => {
        this.notesUpdate(ResponsJson);
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteNote = note => {
    NoteService.deleteNote(note)
      .then(() => this.updateNotes())
      .catch(err => {
        console.log(err);
      });
  };

  deleteFolder = folder => {
    FolderService.deleteFolder(folder)
      .then(() => this.updateFolders())
      .catch(err => {
        console.log(err);
      });
  };

  notesUpdate = notes => {
    this.setState({ notes: notes });
  };

  folderUpdate = newFolders => {
    this.setState({ folders: newFolders });
  };

  render() {
    return (
      <contextMain.Provider
        value={{
          state: this.state,
          updateNotes: this.notesUpdate,
          del: this.deleteNote,
          delFolder: this.deleteFolder
        }}
      >
        <div className="App">
          <div className="Header">
            <div className="logoContainer">
              <Link to="/" className="banner">
                <span className="banner">EvanNote</span>
              </Link>
              <Link to="/about" className="banner">
                <span className="bannerSub">About</span>
              </Link>
            </div>
          </div>
          <HandleError>
            <div className={this.state.foldersToggle ? 'SidebarOn' : 'SideBar'}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={rprops => (
                    <SideBar
                      click={this.folderClick}
                      folders={this.state.folders}
                      show={this.folderAdd}
                    />
                  )}
                />
                <Route
                  path="/folder/"
                  render={rprops => (
                    <SideBar
                      click={this.folderClick}
                      foldernum={this.state.selFolder}
                      folders={this.state.folders}
                      show={this.folderAdd}
                    />
                  )}
                />
                <Route
                  path="/note/"
                  render={({ history }, props) => (
                    <SideBarFolder
                      history={history}
                      folders={this.state.folders}
                    />
                  )}
                />
              </Switch>
            </div>
          </HandleError>
          <HandleError>
            <div className="NoteArea">
              <span className='foldersToggle' onClick={()=> this.setState({foldersToggle: !this.state.foldersToggle})}>Folders</span>
              <ul className="notesList">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => <NoteArea notes={this.state.notes} />}
                  />
                  <Route
                    path="/folder/:itemid"
                    render={props => (
                      <NoteAreaFolder
                        click={this.noteClick}
                        selId={this.state.selFolder}
                        notes={this.state.notes}
                      />
                    )}
                  />
                  <Route
                    path={`/note/${this.state.selNote}`}
                    render={props => (
                      <NoteAreaNote
                        notes={this.state.notes}
                        selId={this.state.selNote}
                        selFolder={this.state.selFolder}
                      />
                    )}
                  />
                </Switch>
              </ul>
              <button className="newNoteButton" onClick={this.noteAdd}>
                Add Note
              </button>
            </div>
          </HandleError>
          {this.state.show && (
            <NewFolder
              toggleFolders={this.folderAdd}
              folders={this.folderUpdate}
            />
          )}
          {this.state.showNote && (
            <NewNote
              toggleNotes={this.noteAdd}
              notes={this.notesUpdate}
              folders={this.state.folders}
            />
          )}
        </div>
      </contextMain.Provider>
    );
  }
}
