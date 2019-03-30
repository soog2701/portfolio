import React from 'react';
// import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router';
import {
    // BrowserRouter,
    Route,
    // Link,
    // Redirect,
    // withRouter,
    Switch
} from "react-router-dom"; // https://github.com/ReactTraining/react-router/issues/4648 
// react-router-dom re-exports all of react-router's exports, so you only need to import from react-router-dom in your project.
// https://reacttraining.com/react-router/web/api/history/history-is-mutable

import Login from './../components/login/login';
import List from './../components/page/card';
import Main from './../components/main';
// const supportsHistory = 'pushState' in window.history

const RouterView = ({ store }) => (
    // <BrowserRouter>
    <div>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/list" component={List} />
        </Switch>
    </div>    
    // </BrowserRouter>
);

// Root.propTypes = {
//     store: PropTypes.object.isRequired,
// };

export default RouterView;