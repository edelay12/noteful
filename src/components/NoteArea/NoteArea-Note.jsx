import React from 'react';
import {NavLink} from 'react-router-dom'
import mainContext from './../../Context'


export default function NoteAreaNote(props) {

    const context = React.useContext(mainContext);

    let arr = context.state.notes.filter((item) => {
       
        return item.id === props.selId;  
    })
return (
    <>
{arr.map((note) => 
   <>
  <div className='note'>
    <h3 className='nName'>{note.name}</h3>
    <h6 className='dModified'> Date modified: <br/>{note.modified}</h6>
    <button className='deleteNoteButton' value={note.id} onClick={() => context.del(note.id)}>X</button>
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