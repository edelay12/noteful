import React from 'react';
import '../SideBar/sideBar.css'
import { NavLink } from 'react-router-dom'
import mainContext from './../../Context'
import PropTypes, { string } from 'prop-types'

export default function SideBar(props) {


    return (
      <mainContext.Consumer>
          {mainContext =>
       <>
        <ul className = 'folderList'>
        {mainContext.state.folders.map((item, index) => 
        
           <li onClick={() => props.click(item.id)} key={item.id}> 
            <NavLink to={`/folder/${item.id}`}  className='inactive' activeClassName='selectedLink'>
              <div className= 'linkContainer'>
           <h1 className='linkName'>{item.name}</h1>
           </div>
           </NavLink>
           </li>
        )}
              </ul>
              <button className='addFolderButton' onClick={props.show}>Add Folder</button>
              <button className='addFolderButton' onClick={() => mainContext.delFolder(props.foldernum)}>Remove folder</button>
        
              
              </>
        }
              </mainContext.Consumer>
    )
}

SideBar.propType = {
   value : PropTypes.string
};