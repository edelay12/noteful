import React from 'react';
import { NavLink } from  'react-router-dom';
import mainContext from './../../Context'



export default class NoteAreaFolder extends React.Component{
    static contextType = mainContext;

componentWillMount (){
   
}
componentDidMount() {
fetch('http://localhost:9090/notes')
.then(Response => {if(Response.ok) {
 return Response.json();
}
throw new Error (Response.statusText);
})
.then(ResponsJson => {
    console.log('response: ')
    console.log(ResponsJson)
    this.context.updateNotes(ResponsJson);
})
.catch(err => {
    console.log(err)
})

}
render() {

    let arr = this.context.state.notes.filter((item) => {
        console.log(item.folderId +'---  prop  ---  ' + this.props.selId)
        return item.folderId === this.props.selId;  
    })
console.log(arr)
    return (
        <>
        {arr.map((note) => 
        
            <li key ={note.id}>
                <NavLink to={`/note/${note.id}`}>
            <h3 onClick={()=> this.props.click(note.id)}>{note.name}</h3>  </NavLink>
            <h6> Date modified: <br/>{note.modified}</h6>
            <button className='deleteNoteButton' value={note.id}>Delete</button>
          
        </li>
        )}
        </>
    )
        }
}