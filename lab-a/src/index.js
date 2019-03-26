import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './layouts/css/index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

// const store = configureStore();
// store.runSaga(rootSaga);

// import { createStore } from 'redux'
// import rootReducer from './reducers'
// const viewstore = createStore(rootReducer)
// // 초기 상태를 기록합니다.
// console.log(viewstore.getState());
// // 상태가 바뀔때마다 기록합니다.
// let unsubscribe = viewstore.subscribe(() =>
//     console.log(viewstore.getState())
// );
// 액션들을 보냅니다.
// viewstore.dispatch(Login(true, 'user1', 'token1'));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
