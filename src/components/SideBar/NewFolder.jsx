import React from 'react';
import mainContext from './../../Context'
import './newfolder.css'


export default class NewFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: {
            value: "",
            touched: false
          }
        };
      }
handleChange(e) {
    console.log(e)
    this.setState({name : { value : e , touched: true}})
}

generateId = () => {
    var text = "",
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
possibleNums = "0123456789";
for( var i=0; i < 15; i++ ){
  text += possible.charAt(Math.floor(Math.random() * possible.length));
  text += possibleNums.charAt(Math.floor(Math.random() * possible.length));
}
return text;
}

 handleNewFolderSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state.name.value);
        
        fetch(`http://localhost:9090/folders/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
                name : this.state.name.value
            })
          })
          .then(Response => {
            if (Response.ok) {
              console.log(Response)
              this.folderUpdate();
              return this.props.toggleFolders();

            }
            throw new Error(Response.statusText);
          })
          .catch(err => {
            console.log(err);
          });
          

      }

      folderUpdate = () => {
        fetch("http://localhost:9090/folders")
        .then(Response => {
          if (Response.ok) {
            return Response.json();
          }
          throw new Error(Response.statusText);
        })
        .then(ResponseJson => {
          console.log("Folder update ran");
          this.props.folders(ResponseJson);
        })
        .catch(err => {
          console.log(err);
        });
    }
      

    render(){
return (
<>
<div className='addFolderFrame'>
<form onSubmit={this.handleNewFolderSubmit} className='addFolderForm'>
<p>Name of folder: </p>
<input type="text" onChange={(e) => this.handleChange(e.target.value)}/> 

<button className="submitButton" type='submit'>Add</button>
</form>
</div>
</>
    
)
    }
}

