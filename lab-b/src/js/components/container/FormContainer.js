import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      //city: "SEOUL"
    };
    this.handleChange = this.handleChange.bind(this);
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
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });  
  }
  changeTemp(event){
    //event.preventDefault();   
    //event.target.getAttribute("data-city");
    this.setState({[event.target.tempid]: event.target.getAttribute("data-city")});
    console.log( this.state  );
  }
  render() {    
    const { city } = this.state;    
    return (
      <form id="article-form">
        <div className="form-group" >        
          {/* <label htmlFor={"city"}>{"city"}</label>
          <input 
            className="form-control"
            readOnly
            text="city"
            label="city"          
            type="text"
            id="city"
            placeholder="SEOUL"
          
            // value={city}
            // handleChange={this.handleChange}          
          />         */}
          {this.btn.map((c,i)=>{
            return i === 0? (<button className="select" rel={c[0]} data-city={c[1]} onClick={this.changeTemp} >{c[2]}</button>):(<button rel={c[0]} data-city={c[1]} onClick={this.changeTemp} >{c[2]}</button>);
          })}
        </div>
      </form>
    );
  }
}
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;

export default FormContainer;