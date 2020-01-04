import React from 'react';
import {NavLink} from 'react-router-dom'

export default function NoteAreaNote(props) {
    let arr = props.notes.filter((item) => {
        console.log(item.folderId +'---  prop  ---  ' + props.selId)
        return item.id === props.selId;  
    })
return (
    <>
{arr.map((note) => 
   <>
  <div className='note'>
    <h3>{note.name}</h3>
    <h6> Date modified: <br/>{note.modified}</h6>
    <button className='deleteNoteButton' value={note.id}>Delete</button>
    </div>

    <section className='contentContainer'>
        <h3 className='content'>
            {note.content}
        </h3>

    </section>
    </>
)}
</>
)

}