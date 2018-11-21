import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
import TempTop from "../tempMain/TempTop";
import Tempul from "../tempMain/Temp-ul";
import axios from "axios";

var getSiblings = function (elem) {
	// Setup siblings array and get the first sibling
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling
	}
	return siblings;
};

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      //city: "SEOUL"
    };
    //this.handleChange = this.handleChange.bind(this);
    this.changeTemp = this.changeTemp.bind(this);
    this.btn = [];
    // 서울:1835848 인천:1843564 창원:1846326 가평:1843082 교토:1857910 로스앤젤레스:5368381 뉴욕:5128638
    this.btn[0] = ['js-btn','1835848','서울'];
    this.btn[1] = ['js-btn','1843564','인천'];
    this.btn[2] = ['js-btn','1846326','창원'];
    this.btn[3] = ['js-btn','1843082','가평'];
    this.btn[4] = ['js-btn','1857910','교토'];
    this.btn[5] = ['js-btn','5368381','로스앤젤레스'];
    this.btn[6] = ['js-btn','5128638','뉴욕'];
  }
  
  changeTemp(event){
    event.preventDefault();    
    let target = event.target.getAttribute("data-city");
    let btn = event.target;    
    getSiblings(btn).map((k,m)=>{ k.classList.remove('select'); });
    btn.classList.add('select');
    this.setTempData(target);
    this.setTempUlData(target);
  }
  setTempData(target){
    let resp;
    let set = this;
    axios.get('http://api.openweathermap.org/data/2.5/weather?id='+ target +'&appid=5cd86456a36ccfc630beca8372515a12').then(function (response){
        resp = response.data; 
        
        Object.assign(set.setState, set.setState({
            description: resp.weather[0].description,
            main: Math.round(resp.main.temp- 273.15),
            humidity: resp.main.humidity,
            clouds: resp.clouds.all
        }));
         
    });    
  }  
  setTempUlData(target){
    let resp;
    let set = this;
    let arr = [];
    let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    axios.get('http://api.openweathermap.org/data/2.5/forecast?id='+ target +'&appid=5cd86456a36ccfc630beca8372515a12').then(function (response){
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
        Object.assign(set.setState, set.setState({tempData:arr}));        
    });
  }
  componentDidMount() {
    this.setTempData(1835848);
    this.setTempUlData(1835848);
    
  }
  render() {    
    //const { city } = this.state; 
    return (
      <div>
        <div className="temp-search">
          <form id="article-form">
            <div className="form-group" >          
              {this.btn.map((c,i)=>{
                return i === 0? (<button className="select" rel={c[0]} data-city={c[1]} onClick={this.changeTemp} >{c[2]}</button>):(<button rel={c[0]} data-city={c[1]} onClick={this.changeTemp} >{c[2]}</button>);
              })}              
            </div>
          </form>          
        </div>   
        <div className="tempbox">
          <TempTop description={this.state.description} main={this.state.main} humidity={this.state.humidity} clouds={this.state.clouds} />
          <Tempul tempData={this.state.tempData} />
        </div>
      </div>
      
      
    );
  }
}

export default FormContainer;