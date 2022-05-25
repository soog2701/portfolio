import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';

import rootReducer from './Reducers';
import rootSaga from './Sagas';

const store = configureStore({
  reducer: rootReducer,
})

export default store