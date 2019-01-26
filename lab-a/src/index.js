import React from "react";
import ReactDOM from "react-dom";

import Root from './router/router';

// import App from "./Components/App";
import "./styles/main.css";

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

// ReactDOM.render(<App />, document.getElementById("app"));
ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>, 
    document.getElementById('app'));