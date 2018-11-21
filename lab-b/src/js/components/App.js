import React, { Component } from 'react';
import ReactDOM from "react-dom";
import FormContainer from "./container/FormContainer";

class App extends Component {
    render () {
        return (            
            <FormContainer />                      
        )        
    }
}
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<App />, wrapper) : false;