import React from 'react';
import { Route , Switch , Link } from 'react-router-dom'
import './App.css';
import SideBar from './components/SideBar/SideBar-Main'
import NoteArea from './components/NoteArea/NoteArea-Main';
import NoteAreaFolder from './components/NoteArea/NoteArea-Folder'
import NoteAreaNote from './components/NoteArea/NoteArea-Note';
import Store from './Store';
import SideBarFolder from './components/SideBar/SideBar-Folder';


export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      folders: Store.folders,
      notes: Store.notes,
      show: false,
      selFolder: null,
      selNote: null
    }

  }

  folderClick = (e)=> {
      console.log(e)
      this.setState({selFolder: e
      })
      console.log('state: ' + this.state.selFolder)
  }

  noteClick = (e) => {
    console.log(e)
 
    this.setState({
      selNote : e
    })
  }

  backClick = (e) => {
    
  }
  /*renderRoutesNotes = (e) => {

    const selNotes = [];
    console.log(selNotes)
    for(let i = 0; i < this.state.notes.length; i++){
      if(this.state.notes[i].id === selFolder) selNotes.push(...this.state.notes[i]);
    }
    console.log(selNotes)
  }

    renderRoutesSideBar(){
    <Route path='/folder/:folderId' render={(props)=> <SideBarFolder click={this.folderClick} folders={this.state.folders}/>}/>
  } */

  render(){
   
  return (
    <div className="App">
      <div className='Header'>
        <Link to='/'>
        <h1 className='banner'>Noteful</h1>
        </Link>
      </div>

      <div className='SideBar'>
        
        <Switch>
      <Route exact path='/' render={(rprops) => <SideBar click={this.folderClick} folders={this.state.folders}/>} />
      <Route  path='/folder/' render={(rprops) => <SideBar click={this.folderClick} folders={this.state.folders}/>} />
      <Route path='/note/' render={({history}, props) => <SideBarFolder history={history} folders={this.state.folders}/>} />
      </Switch>
      </div>

      <div className='NoteArea'>
      <ul className='notesList'>
      <Switch>
  <Route exact path='/' render={(props) => <NoteArea notes={this.state.notes}/>} />
  <Route path='/folder/:itemid' render={(props) => <NoteAreaFolder click={this.noteClick} selId={this.state.selFolder} notes={this.state.notes} />} />
    <Route path={`/note/${this.state.selNote}`} render={(props) => <NoteAreaNote notes={this.state.notes} selId={this.state.selNote}/>}/>
      </Switch>
      </ul>
     <button className='newNoteButton' >New Note</button>
      </div>
    </div>
  ); }
}

