import React from 'react';
import '../SideBar/sideBar.css'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function SideBar(props) {
    return (
       <>
        <ul className = 'folderList'>
        {props.folders.map((item) => 
           <li onClick={() => props.click(item.id)} key={item.id}> 
            <NavLink to={`/folder/${item.id}`}  className='inactive' activeClassName='selectedLink'>
              <div className= 'linkContainer'>
           <h1 className='linkName'>{item.name}</h1>
           </div>
           </NavLink>
           </li>
        )}
              </ul>
              <button className='folderButton' onClick={props.show}>Add Folder</button>
              <button className='folderButton' onClick={() => props.delFolder(props.foldernum)}>Remove folder</button>
        
              
              </>
        
    )
}

SideBar.propType = {
   value : PropTypes.string,
   show: PropTypes.func,
   foldernum : PropTypes.number,
   click : PropTypes.func
};