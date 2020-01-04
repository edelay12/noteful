import React from 'react';
import { NavLink } from  'react-router-dom';

export default function NoteAreaFolder(props){
    let arr = props.notes.filter((item) => {
        console.log(item.folderId +'---  prop  ---  ' + props.selId)
        return item.folderId === props.selId;  
    })
console.log(arr)
    return (
        <>
        {arr.map((note) => 
        
            <li key ={note.id}>
                <NavLink to={`/note/${note.id}`}>
            <h3 onClick={()=> props.click(note.id)}>{note.name}</h3>  </NavLink>
            <h6> Date modified: <br/>{note.modified}</h6>
            <button className='deleteNoteButton' value={note.id}>Delete</button>
          
        </li>
        )}
        </>
    )
}