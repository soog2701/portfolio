import React from 'react';
import { Provider } from 'react-redux'

import store from './store'
import saga from './sagas/saga.js'
import Root from './layouts/root'
import { sagaMiddleware } from './middleware'
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from "react-router-dom";

// Theme
import {theme} from './layouts/theme'

// run the saga
sagaMiddleware.run(saga);

const App = () => (
  <Provider store={store} >
    <BrowserRouter>
      <MuiThemeProvider theme={theme} >
        <Root />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
)
export default App

// sagaMiddleware.run(saga)