import React from 'react';

export default class NewNote {
constructor(props){
    super(props)

    this.state = {
        name: {
            value: "",
            touched: false
          },
          content: {
            value: "",
            touched: false
          },
          folder: {
            value: "",
            touched: false
          }
    }
}
    componentDidMount(){
        //get folder list
        
    }

    render() {
        return (
            <div className='newNoteForm'>
            <form className='noteForm'>
            <p>Name</p><input type="text"/>
            <p>Content</p><input type="text"/>

<input type='select'></input>
                </form>
            </div>
        )
    }
}