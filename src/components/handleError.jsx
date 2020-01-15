import React from 'react';

export default class HandleError extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hasError : false
        }
    }
    static getDerivedStateFromError(err) {
        return { hasError: true };
    }
render(err) {
    if (this.state.hasError) {
        return (
<h1 className='errorText'>{`Sorry, cannot process your request at this point. Error: ${err}`}</h1>
        );
    } 
        return this.props.children;
    
}
}

