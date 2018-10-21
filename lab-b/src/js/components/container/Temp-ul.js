import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Templi from "../presentational/Temp-li";

class Tempul extends Component {
  constructor() {
    super();
    this.state = {
      tempData: [
          { day:"", main:"", max:0, min:0 }
      ]
    };
    
  }
  weatherUpdate() {        
    let resp;
    let set = this;
    let d = axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=5cd86456a36ccfc630beca8372515a12').then(function (response){
        resp = response.data;
         /*
        const resp = response.data;
        console.log(resp);
        console.log("현재온도 : "+ (resp.main.temp- 273.15) );
        console.log("현재습도 : "+ resp.main.humidity);
        console.log("날씨 : "+ resp.weather[0].main );
        console.log("상세날씨설명 : "+ resp.weather[0].description );
        console.log("날씨 이미지 : "+ resp.weather[0].icon ); //var imgURL = "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
        console.log("바람   : "+ resp.wind.speed ); 
        console.log("나라   : "+ resp.sys.country );
        console.log("도시이름  : "+ resp.name );
        console.log("구름  : "+ (resp.clouds.all) +"%" ); */
        console.log( resp );
        set.setState({
            day : resp.name,                
            main : resp.weather[0].description,
            max: (resp.main.temp_max- 273.15),
            min: (resp.main.temp_min- 273.15)   
        });
        
    });
  }
  componentDidMount() {
    this.weatherUpdate();      
  }

  render() {    
    return (
      <ul calss="week">
        {/* {this.state.tempData.map((d, i) => {          
            return (<Templi />);
        })} */}
      </ul>
    );
  }
}
const wrapper = document.getElementById("week");
wrapper ? ReactDOM.render(<Tempul />, wrapper) : false;

export default Tempul;