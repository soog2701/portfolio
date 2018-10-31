import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";


class TempTop extends Component {
    constructor() {
      super();     
      
    }     
    
    render() {    
        return (
            <div className="main">
                <h1> {this.props.description} </h1>
                <div className="right"><span>{this.props.main}</span>°C</div>
                <ul>
                    <li>humidity : <span>{this.props.humidity}</span>%</li>
                    <li>clouds : <span>{this.props.clouds}</span>%</li>
                </ul>
            </div>
        );
    }
}
//const wrapper = document.getElementById("tempbox");
//wrapper ? ReactDOM.render(<TempTop description={""} main={""} humidity={""} clouds={""} />, wrapper) : false;

export default TempTop;