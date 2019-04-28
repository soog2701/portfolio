import React from 'react';
import { Provider } from 'react-redux'

import store from './store'
import saga from './sagas/saga.js'
import Root from './layouts/root'
import { sagaMiddleware } from './middleware'
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Router } from "react-router-dom"; // BrowserRouter
// import { Router } from "react-router";
import customHistory from './history';
// Theme
import {theme} from './layouts/theme'

// run the saga
sagaMiddleware.run(saga);
//   {/*   history.push 작동 */}
const App = () => (
  <Provider store={store} >
    <Router history={customHistory}>
      <MuiThemeProvider theme={theme} >
        <Root />
      </MuiThemeProvider>
    </Router>
  </Provider>
)
export default App

// sagaMiddleware.run(saga)