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
import NewFolder from "./components/new-folder/NewFolder";
import NewNote from "./components/new-note/newNote";
import HandleError from "./components/handleError";
import FolderService from "./services/folder-api-service";
import NoteService from "./services/note-api-service";
import EditNote from "./components/EditNotePage/EditNote";
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
      foldersToggle: false
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
      .then(res => this.updateNotes(res))
      .catch(err => {
        console.log(err);
      });
  };

  deleteFolder = folder => {
    console.log("delete" + folder);
    FolderService.deleteFolder(folder)
      .then(res => this.folderUpdate(res))
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
            <div className={this.state.foldersToggle ? "SidebarOn" : "SideBar"}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={rprops => (
                    <SideBar
                      click={this.folderClick}
                      folders={this.state.folders}
                      show={this.folderAdd}
                      delFolder={this.deleteFolder}
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
                      selNoteFolder={this.state.selNoteFolder}
                    />
                  )}
                />
              </Switch>
            </div>
          </HandleError>
          <HandleError>
            <div className="NoteArea">
              <span
                className="foldersToggle"
                onClick={() =>
                  this.setState({ foldersToggle: !this.state.foldersToggle })
                }
              >
                Folders
              </span>
              <ul className="notesList">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <NoteArea
                        click={this.noteClick}
                        notes={this.state.notes}
                        del={this.deleteNote}
                      />
                    )}
                  />
                  <Route
                    path="/folder/:itemid"
                    render={props => (
                      <NoteAreaFolder
                        click={this.noteClick}
                        selId={this.state.selFolder}
                        notes={this.state.notes}
                        noteAdd={this.noteAdd}
                        updateNotes={this.updateNotes}
                        del={this.deleteNote}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={`/note/:noteId`}
                    render={props => (
                      <NoteAreaNote
                        notes={this.state.notes}
                        selId={this.state.selNote}
                        selFolder={this.state.selFolder}
                        del={this.deleteNote}
                      />
                    )}
                  />
                  <Route
                    path={`/note/:noteId/edit`}
                    render={({ history }, props) => (
                      <EditNote
                        history={history}
                        toggleNotes={this.noteAdd}
                        notes={this.state.notes}
                        notesUpdate={this.notesUpdate}
                        selId={this.state.selNote}
                        folders={this.state.folders}
                      />
                    )}
                  />
                </Switch>
              </ul>
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
              notes={this.state.notes}
              notesUpdate={this.notesUpdate}
              selId={this.state.selNote}
              folders={this.state.folders}
            />
          )}
        </div>
    );
  }
}

/*
 <button className="newNoteButton" onClick={this.noteAdd}>
                Add Note
              </button>

              */
