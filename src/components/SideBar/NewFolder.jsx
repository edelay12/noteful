import React from 'react';
import { DATABASE_URL } from '../../config'
import mainContext from './../../Context'
import './newfolder.css'


export default class NewFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: {
            value: "",
            touched: false,
            throw: false,
          }
        };
      }
handleChange(e) {
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

        if (!this.state.name.touched) {
         return this.setState({name : {
            throw : true
          }})
        } else {
          this.setState({name : {
            throw : false
          }})
        
       
        fetch(`${DATABASE_URL}/folders`, {
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
              this.folderUpdate();
              return this.props.toggleFolders();

            }
            throw new Error(Response.statusText);
          })
          .catch(err => {
            console.log(err);
          });
          
        }
      }

      folderUpdate = () => {
        fetch(`${DATABASE_URL}/folders`)
        .then(Response => {
          if (Response.ok) {
            return Response.json();
          }
          throw new Error(Response.statusText);
        })
        .then(ResponseJson => {
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
<span>Name of folder: </span>
{this.state.name.throw && (<p style={{color : "red"}}>Name is required</p>)}
<input className='nameFolderInput' type="text" onChange={(e) => this.handleChange(e.target.value)}/> 

<button className="submitButton" type='submit'>Add</button>
</form>
<span className="closeForm" type='button' onClick={this.props.toggleFolders}>X</span>
</div>
</>
    
)
    }
}

