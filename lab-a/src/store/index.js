import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

// const sagaMiddleware = createSagaMiddleware()
// const store = createStore(
//     reducer,
//     pplyMiddleware(sagaMiddleware)
// )
// sagaMiddleware.run(helloSaga)

// const action = type => store.dispatch({type})