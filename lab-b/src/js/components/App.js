import React, { Component } from 'react';
import ReactDOM from "react-dom";
import FormContainer from "./container/FormContainer";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        console.log( this.props.store.getState() );
    }
    render () {
        let centerStyle = {           
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            MsUserSelect:'none',
            userSelect: 'none',
            cursor: 'pointer'
        };
        return (            
            <div>                
                <FormContainer />                               
                <div
                    onClick={ this.onClick }
                    style={ centerStyle }
                >
                    <h1> {this.props.store.getState().value} </h1>
                </div>
            </div>
        )        
    }
    onClick() {
        this.props.store.dispatch(increase(1));
    }
}
export default App;
