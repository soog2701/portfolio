import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      city: "SEOUL"
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    const { city } = this.state;
    return (
      <form id="article-form">
        <div className="form-group" >        
          <label htmlFor={"city"}>{"city"}</label>
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
          />          
        </div>
      </form>
    );
  }
}
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;

export default FormContainer;