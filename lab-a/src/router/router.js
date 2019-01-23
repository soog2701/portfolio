import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
// import { Router, Route, browserHistory } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './../Components/App';

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