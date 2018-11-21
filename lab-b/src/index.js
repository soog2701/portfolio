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
const store = createStore(counterReducer);
