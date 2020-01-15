import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import contextMain from "../../Context";
export default function SideBarFolder(props) {

    return (
        <contextMain.Consumer>
              {contextMain => 
        <>
        {props.folders.map((folder) => 
       contextMain.state.selNoteFolder === folder.id ? <h3 className='currentFolder'>Folder: {folder.name}</h3> : null
        ) }

        <button onClick={props.history.goBack}>
            Go back
        </button>
       
        </>
              }
        </contextMain.Consumer>
    )

}

SideBarFolder.propType = {
    history: PropTypes.number,
    folders: PropTypes.object
}