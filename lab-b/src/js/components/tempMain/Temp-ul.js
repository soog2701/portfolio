import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Templi from "../presentational/Temp-li";

class Tempul extends Component {
  constructor() {
    super();
        
  } 

  render() { 
    return (
      <ul className="week">
        {this.props.tempData.map((con, kindex) => {
            return (<Templi day={con.day} main={con.main} max={con.max} min={con.min} />);
        })}
      </ul>
    );
  }
}
//const wrapper = document.getElementById("week");
//wrapper ? ReactDOM.render(<Tempul />, wrapper) : false;
Tempul.defaultProps = {
  tempData: [{ day:"", main:"", max:0, min:0 }]
}; 
export default Tempul;