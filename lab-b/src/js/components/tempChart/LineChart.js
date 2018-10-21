import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLine } from 'victory';

class LineChart extends Component {    
    constructor(props) {
        super();             
        this.state = {
            data: null
        };
        //console.log( typeof series , series );        
    } 
    componentDidMount() {        
        let temp = [];
        //console.log( "mui ", this.state );
        let resp;
        let set = this;
        let d = axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=5cd86456a36ccfc630beca8372515a12').then(function (response){
            resp = response.data;
            for( var i =3 ; i<resp.list.length; i++ ){
                //list_dt.push( resp.list[i].dt_txt );
                //list_temp.push( Math.round(resp.list[i].main.temp -273.15) );
                temp[i] = { x: resp.list[i].dt_txt, y: Math.round(resp.list[i].main.temp -273.15) };
            }            
            set.setState({
                data: temp
            });
            console.log( 's2   ',temp );
        });
    }    
    render() {              
        return <VictoryChart 
                    width = {7000} 
                    height = {190}                    
                    domainPadding={{ x: 20 }}                    
                >
                    <VictoryLine                         
                        data={this.state.data}
                        style={{
                            data: { fontSize:'9px'},
                            labels: {
                              fontSize: 10
                            }
                            
                        }}
                        alignment="start"
                        
                    />
                </VictoryChart>;        
    }

}

ReactDOM.render(
    <LineChart />,
    document.getElementById('create-chart')
);
export default LineChart;