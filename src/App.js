import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar/SideBar-Main";
import NoteArea from "./components/NoteArea/NoteArea-Main";
import NoteAreaFolder from "./components/NoteArea/NoteArea-Folder";
import NoteAreaNote from "./components/NoteArea/NoteArea-Note";
import Store from "./Store";
import SideBarFolder from "./components/SideBar/SideBar-Folder";
import contextMain from "./Context";
import NewFolder from './components/SideBar/NewFolder'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      notes: [],
      show: false,
      selFolder: null,
      selNote: null,
      folderAdd : null
    };
  }
  folderAdd = e => {
    console.log('adding folder')
if (this.state.show) {
  return this.setState({show : false})
} 
this.setState({show : true});
  }

  componentDidMount() {
    fetch("http://localhost:9090/notes")
      .then(Response => {
        if (Response.ok) {
          return Response.json();
        }
        throw new Error(Response.statusText);
      })
      .then(ResponsJson => {
        console.log("response: ");
        console.log(ResponsJson);
        this.notesUpdate(ResponsJson);
      })
      .catch(err => {
        console.log(err);
      });

    fetch("http://localhost:9090/folders")
      .then(Response => {
        if (Response.ok) {
          return Response.json();
        }
        throw new Error(Response.statusText);
      })
      .then(ResponseJson => {
        console.log("notes ran");
        console.log(ResponseJson);
        this.folderUpdate(ResponseJson);
      })
      .catch(err => {
        console.log(err);
      });
  }

  folderClick = e => {
    console.log(e);
    this.setState({ selFolder: e });
    console.log("state: " + this.state.selFolder);
  };

  noteClick = e => {
    console.log(e);
    this.setState({
      selNote: e
    });
  };
updateNotes = () => {
  fetch("http://localhost:9090/notes")
  .then(Response => {
    if (Response.ok) {
      return Response.json();
    }
    throw new Error(Response.statusText);
  })
  .then(ResponsJson => {
    console.log("response: ");
    console.log(ResponsJson);
    this.notesUpdate(ResponsJson);
  })
  .catch(err => {
    console.log(err);
  });
}
 deleteNote = e => {
   console.log('delete note')
  /* const arr = this.state.notes.filter((item) => {
     return item.id !== e
   })

   this.setState({
     notes : arr
   }) */

   fetch(`http://localhost:9090/notes/${e}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  })
  .then(Response => {
    if (Response.ok) {
      console.log(Response)
      return this.updateNotes()
    }
    throw new Error(Response.statusText);
  })
  
  .catch(err => {
    console.log(err);
  });
  


 }

  notesUpdate = e => {
    this.setState({ notes: e });
    console.log("folders ran");
    setTimeout(console.log("timeout"), 3000);
  };

  folderUpdate = e => {
    this.setState({ folders: e });
    console.log("folders ran");
    setTimeout(console.log(this.state.notes), 300);
  };

  render() {
    return (
      <contextMain.Provider
        value={{ state: this.state, updateNotes: this.notesUpdate , del : this.deleteNote}}
      >
        <div className="App">
          <div className="Header">
            <Link to="/" className="banner">
              <h1 className="banner">Noteful</h1>
            </Link>
          </div>

          <div className="SideBar">
            <Switch>
              <Route
                exact
                path="/"
                render={rprops => (
                  <SideBar
                    click={this.folderClick}
                    folders={this.state.folders}
                  />
                )}
              />
              <Route
                path="/folder/"
                render={rprops => (
                  <SideBar
                    click={this.folderClick}
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

          <div className="NoteArea">
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
                    />
                  )}
                />
              </Switch>
            </ul>
            <button className="newNoteButton">New Note</button>
          </div>
         {(this.state.show) && <NewFolder folders={(e) => this.folderUpdate }/>}
        </div>
      </contextMain.Provider>
    );
  }
}
