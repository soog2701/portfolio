import React, { Component } from 'react';

// router
import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";
import { Login, Main } from './routes';

// i18n
import { IntlProvider } from 'react-intl';
import messages_en from './util/i18n/en.json';
import messages_ko from './util/i18n/ko.json';

// redux saga
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import loginSet from './redux/login';
// import reducer from './reducer';
import rootSaga from './store/saga';

// i18n
const messages = {
  'ko': messages_ko,
  'en': messages_en
};

const defaultLang = localStorage.getItem('lang') || 'ko';

//
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  // reducer,
  loginSet,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
// const action = type => store.dispatch({type});

console.log(store.getState())

function App() {
  return (
    <Provider store={store}>
      <IntlProvider locale={defaultLang} messages={messages[defaultLang]} >
        <Router>
          {/* <PrivateRoute path="/" component={Main}></PrivateRoute> */}
          <Route path="/" exact component={Login} />
          {/* <Route path="/login" exact component={Login} /> */}
        </Router> 
      </IntlProvider>
    </Provider>
  );
}
var isLogin = store.getState();
function PrivateRoute({ component: Component, ...rest }) {  
  return (
    <Route
      {...rest}
      render={props =>
        isLogin === 'login' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
/*
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }  
};
*/


export default App;
