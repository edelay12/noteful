import React from 'react';
import '../NoteArea/NoteArea.css'
import mainContext from './../../Context'

export default function NoteArea(props){
  
    return (
        <mainContext.Consumer>
        {mainContext =>
        <>
  
         {mainContext.state.notes.map((note) =>
         <li key ={note.id}>
             <h3 className='noteLabel'>{note.name}</h3>
             <h6> Date modified: <br/>{note.modified}</h6>
             <button className='deleteNoteButton' value={note.id} onClick={() => mainContext.del(note.id)}>Delete</button>
         </li>
         )
         }

     </>
        }
        </mainContext.Consumer>
    )
}