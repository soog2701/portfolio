import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom'; // https://github.com/ReactTraining/react-router/issues/4648 
// react-router-dom re-exports all of react-router's exports, so you only need to import from react-router-dom in your project.
// https://reacttraining.com/react-router/web/api/history/history-is-mutable

import App from './../Components/App';

// const supportsHistory = 'pushState' in window.history

const Root = ({ store }) => (
    // <Provider store={store}>
    //     <Router history={browserHistory}>
    //         <Route path="/(:filter)" component={App} />
    //     </Router>
    // </Provider>

    <BrowserRouter>
        <Route path="/" component={App}/>
    </BrowserRouter>

);

// Root.propTypes = {
//     store: PropTypes.object.isRequired,
// };

export default Root;