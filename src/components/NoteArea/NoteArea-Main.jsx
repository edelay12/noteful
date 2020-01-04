import React from 'react';
import '../NoteArea/NoteArea.css'

export default function NoteArea(props){
    return (
        <>
         {props.notes.map((note) =>
         <li key ={note.id}>
             <h3>{note.name}</h3>
             <h6> Date modified: <br/>{note.modified}</h6>
             <button className='deleteNoteButton' value={note.id}>Delete</button>
         </li>
         )
        }
   
     </>
    )
}