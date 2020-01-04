import React from 'react';
import '../SideBar/sideBar.css'
import { NavLink } from 'react-router-dom'


export default function SideBar(props) {


    return (
       <>
        <ul className = 'folderList'>
        {props.folders.map((item, index) => 
        
           <li onClick={() => props.click(item.id)} key={item.id}> 
            <NavLink to={`/folder/${item.id}`} activeClassName='selectedLink'>
              <div className= 'linkContainer'>
           <h1 className='linkName'>{item.name}</h1>
           </div>
           </NavLink>
           </li>
        )}
              </ul>
              <button className='addFolderButton'>Add Folder</button>
              </>
    )
}