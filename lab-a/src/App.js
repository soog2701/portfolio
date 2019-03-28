import React from 'react';
import { Provider } from 'react-redux'

import store from './store'
import saga from './sagas/saga.js'
import Main from './layouts/main'
import { sagaMiddleware } from './middleware'
import { MuiThemeProvider } from '@material-ui/core/styles';
// Theme
import {theme} from './layouts/theme'

// run the saga
sagaMiddleware.run(saga);

const App = () => (
  <Provider store={store} >
    <MuiThemeProvider theme={theme} >
      <Main />
    </MuiThemeProvider>
  </Provider>
)
export default App

// sagaMiddleware.run(saga)