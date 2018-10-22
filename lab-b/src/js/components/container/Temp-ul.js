import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Templi from "../presentational/Temp-li";

class Tempul extends Component {
  constructor() {
    super();
    this.state = {
      tempData: [
          //{ day:"", main:"", max:0, min:0 }
      ]
    };
    
  }
 
  componentDidMount() {
    let resp;
    let set = this;
    let arr = [];
    let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=5cd86456a36ccfc630beca8372515a12').then(function (response){
        resp = response.data; 
        for( let i = 3; i<resp.list.length; i=i+8){
          let mins = i+4;
          if( mins<resp.list.length ){
            let nextday = resp.list[i].dt_txt.split(" ")[0];            
            arr.push({ 
              day: days[new Date(nextday).getDay()], 
              main: resp.list[i].weather[0].main, 
              max: Math.round(resp.list[i+2].main.temp - 273.15),
              min: Math.round(resp.list[mins].main.temp - 273.15)
            });
          }          
        }        
        set.setState({tempData:arr});
        
    });
  }

  render() {    
    return (
      <ul className="week">
        {this.state.tempData.map((con, kindex) => {
            return (<Templi day={con.day} main={con.main} max={con.max} min={con.min} />);
        })}
      </ul>
    );
  }
}
const wrapper = document.getElementById("week");
wrapper ? ReactDOM.render(<Tempul />, wrapper) : false;

export default Tempul;