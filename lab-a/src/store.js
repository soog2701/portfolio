import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'

import reducers from './reducers'
import middleware from './middleware'

// import {routerMiddleware} from 'react-router-redux';

// const initialState = {};
// const store = configureStore(initialState, browserHistory);
// const middlewares = [sagaMiddleware, routerMiddleware(history)];
const store = createStore(
    combineReducers({
        ...reducers,
        form: formReducer
    }),    
    composeWithDevTools(applyMiddleware(...middleware))
)
// console.log(store.getState()); /// 무한루프...
// 상태가 바뀔때마다 기록합니다.

// 액션들을 보냅니다.
// store.dispatch(Login(true, 'user1', 'token1'));

export default store
