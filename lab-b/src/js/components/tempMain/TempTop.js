import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class TempTop extends Component {
    constructor() {
      super();
      this.state = {
        description: "",
        main: "",
        humidity: "",
        clouds: ""
      };
      
    }    
    componentDidMount() {
        let resp;
        let set = this;       
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=5cd86456a36ccfc630beca8372515a12').then(function (response){
            resp = response.data; 
            set.setState({
                description: resp.weather[0].description,
                main: Math.round(resp.main.temp- 273.15),
                humidity: resp.main.humidity,
                clouds: resp.clouds.all
            });
            
        });
    }
    
    render() {    
        return (
            <div className="main">
                <h1> {this.state.description} </h1>
                <div className="right"><span>{this.state.main}</span>°C</div>
                <ul>
                    <li>humidity : <span>{this.state.humidity}</span>%</li>
                    <li>clouds : <span>{this.state.clouds}</span>%</li>
                </ul>
            </div>
        );
    }
}
const wrapper = document.getElementById("tempbox");
wrapper ? ReactDOM.render(<TempTop />, wrapper) : false;

export default TempTop;