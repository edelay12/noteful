import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export default function SideBarFolder(props) {
  return (
        <>
          {props.folders.map(folder =>
            props.selNoteFolder === folder.id ? (
              <h3 className="currentFolder">{folder.name}</h3>
            ) : null
          )}

          <button className='backButton' onClick={props.history.goBack}>Go back</button>
        </>
  );
}

SideBarFolder.propType = {
  history: PropTypes.number,
  folders: PropTypes.object
};
