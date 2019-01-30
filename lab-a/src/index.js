import React from "react";
import ReactDOM from "react-dom";

// import Root from './router/router';

import App from "./Components/App";
import "./styles/main.css";

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

// import { Login } from './actions'

const store = createStore(rootReducer)
// 초기 상태를 기록합니다.
console.log(store.getState());
// 상태가 바뀔때마다 기록합니다.
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);
// 액션들을 보냅니다.
// store.dispatch(Login(true, 'user1', 'token1'));

// ReactDOM.render(<App />, document.getElementById("app"));
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app')
);
