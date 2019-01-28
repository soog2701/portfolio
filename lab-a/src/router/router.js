import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router';
import {
    BrowserRouter,
    Route,
    Link,
    Redirect,
    withRouter,
    Switch
} from "react-router-dom"; // https://github.com/ReactTraining/react-router/issues/4648 
// react-router-dom re-exports all of react-router's exports, so you only need to import from react-router-dom in your project.
// https://reacttraining.com/react-router/web/api/history/history-is-mutable

import Login from './../Components/login/login';
import List from './../Components/contents/card';

// const supportsHistory = 'pushState' in window.history

const Root = ({ store }) => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/list" component={List} />
        </Switch>
    </BrowserRouter>
);

// Root.propTypes = {
//     store: PropTypes.object.isRequired,
// };

export default Root;