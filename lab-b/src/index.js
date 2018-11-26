import React from 'react';
import ReactDOM from 'react-dom';

//import LineChart from "./js/components/tempChart/LineChart";
//import TempBox from "./js/components/tempMain/TempBox";
//import TempTop from "./js/components/tempMain/TempTop";
//import Tempul from "./js/components/container/Temp-ul";
import App from "./js/components/App";
import './styles/appStyles.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

/*
 * Action
 */
const INCREMENT = "INCREMENT";

function increase(diff) {
    return {
        type: INCREMENT,
        addBy: diff
    };
}

/*
 * Reducer
 */
const initialState = {
    value: 0
};

const counterReducer = (state = initialState, action) => {    
    switch(action.type) {
        case INCREMENT:
            return Object.assign({}, state, {
                value: state.value + action.addBy
            });
        default:
            return state;
    }
}

/*
 * Store
 */
const store = createStore(counterReducer); //store를 만들때는 createStore() 메소드를 사용하며 reducer가 인수로 사용됩니다.

/*
 * render
 */
const render = () => {

    const appElement = document.getElementById('app');
    ReactDOM.render(
        <App store={store}/>,
        appElement
    );
};

store.subscribe(render); //store.subscribe(LISTENER): dispatch 메소드가 실행되면 리스너 함수가 실행됩니다. 즉, 데이터에 변동이 있을때마다 리렌더링하도록 설정합니다.
render();
