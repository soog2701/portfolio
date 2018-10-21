import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class TempBoxMain extends React.Component {
    render() {
        const { main, src} = this.props;
        return (
        <div>
            
            <h3>{ main }°C</h3>
            <p>
                <img src={ src } />
            </p>
        </div>
        );
    }
}

class TempBoxDescription extends React.Component {
    render() {
        const { description } = this.props;
        return (
            
            <div> <h3>{ description }</h3> </div>
        );
    }
}

class TempBoxCloud extends React.Component {
    render() {
        const { clouds } = this.props;
        return (            
            <div> 
                <p>비 올 확률</p>
                <h3>{ clouds }</h3> 
            </div>
        );
    }
}
class TempBoxSpeed extends React.Component {
    render() {
        const { humidity } = this.props;
        return (
            <div> 
                <p>습도</p>
                <h3>{ humidity }</h3> 
            </div>
        );
    }
}
class TempBox extends Component {    
    constructor(props) {
        super(props);
        this.container1El = document.querySelectorAll(".temp")[0];
        this.container2El = document.querySelectorAll(".temp")[1];
        this.container3El = document.querySelectorAll(".temp")[2];
        this.container4El = document.querySelectorAll(".temp")[3];        
        this.state = {};
    } 
     
    weatherUpdate() {        
        let resp;
        let set = this;
        let d = axios.get('http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=5cd86456a36ccfc630beca8372515a12').then(function (response){
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
         
            set.setState({
                name : resp.name,
                main : (resp.main.temp- 273.15).toFixed(1),
                wind : resp.wind.speed,
                clouds : ((resp.clouds.all) +"%" ),
                icon : resp.weather[0].icon, //error
                humidity : (resp.main.humidity)+"%",                
                description : resp.weather[0].description,
                src : "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png"
            });
            
        });
    }

    renderChildren() {        
        console.log( this.state );
        const { main, description, src, clouds, humidity } = this.state;
        const { container1El, container2El, container3El, container4El } = this;        
        ReactDOM.render(<TempBoxMain main={main} src={src} />, container1El);
        ReactDOM.render(<TempBoxDescription description={description}  />, container2El);
        ReactDOM.render(<TempBoxCloud clouds={clouds}  />, container3El);
        ReactDOM.render(<TempBoxSpeed humidity={humidity}  />, container4El);
    }

    componentDidMount() {
        this.weatherUpdate();        
        this.renderChildren();
    }
    
    componentDidUpdate() {
        //this.weatherUpdate();
        this.renderChildren();
    }
    
    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.container1El);
        ReactDOM.unmountComponentAtNode(this.container2El);
        ReactDOM.unmountComponentAtNode(this.container3El);
        ReactDOM.unmountComponentAtNode(this.container4El);
    }

    render() {
        return null;
    }    
}

ReactDOM.render(
    <TempBox />,
    document.createElement("div")
);


export default TempBox;