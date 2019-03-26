import React from 'react';
import { Provider } from 'react-redux'

import store from './store'
import saga from './sagas/saga.js'
import Main from './layouts/main'
import { sagaMiddleware } from './middleware'

// run the saga
sagaMiddleware.run(saga);

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)
export default App

// sagaMiddleware.run(saga)