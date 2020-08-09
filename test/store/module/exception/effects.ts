import {call, put, select} from "redux-saga/effects";

import {EXCEPTION} from "../../types";
import {alert, hide, exception, dataObj} from "./index";

const showAlert = function *(payload: dataObj) {
        try {
            yield put(alert(payload));
        } catch (error) {

            /* error */
        }
    },
    hideOne = function *(payload: number) {
        try {
            yield put(hide(payload));
        } catch (error) {

            /* error */
        }
    };

export {
    showAlert,
    hideOne
};
