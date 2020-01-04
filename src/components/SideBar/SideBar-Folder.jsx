import React from 'react';
import {Link} from 'react-router-dom';

export default function SideBarFolder(props) {

    return (
        <>
        <h3>what folder</h3>

        <button onClick={props.history.goBack}>
            Go back
        </button>
        </>
    )

}