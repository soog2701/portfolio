import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
// import {routerMiddleware} from 'react-router-redux';
// import history from './history';
// const routersMiddleware = routerMiddleware(history)

export const sagaMiddleware = createSagaMiddleware()
export default [sagaMiddleware, logger]