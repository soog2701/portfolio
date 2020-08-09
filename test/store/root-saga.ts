/* global fetch */

import {fork, takeLatest, takeEvery, all} from "redux-saga/effects";

/* import es6promise from "es6-promise"; */

/* import {loginSaga, logout} from "./module/login/effects";
import {exceptionSaga} from "./module/exception/effects";

import {actionTypes as loginType} from "./module/login"; // reducer
import {actionTypes as exceptionType} from "./module/exception"; // reducer
 */
/* es6promise.polyfill(); */

import {EXCEPTION} from "./types";
import {showAlert} from "./module/exception/effects";

const watchUserAuthentication = function *() {
        yield takeEvery("exception/EXCEPTION_REQUEST", showAlert);

        /* yield takeLatest(loginType.INCREASE, logout); // logout
        yield takeLatest(loginType.DECREASE, loginSaga); // login */
    },

    rootSaga = function *() {
        yield fork(watchUserAuthentication);
    };

export default rootSaga;
