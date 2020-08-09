import {call, put, select} from "redux-saga/effects";

import {OAUTH} from "../../types";
import {setLogin, setLogout} from "./index";
import {loginApi} from "./service";

import redirect from "../../../utils/redirect";
import {Cookies} from "react-cookie";

const cookies = new Cookies(),
    logout = function *() {
        try {
            yield put(setLogout());

            /* store 확인 console */
            /* const state = yield select();
            console.log("successLogout after", state); */

            /* remove our token */
            cookies.set("token", false);

            /* redirect to the /login screen */
            redirect(false, "/login");
        } catch (error) {

            /* error */
        }
    },
    loginSaga = function *() {
        try {
            // response = yield call(loginApi, payload);
            // yield put(setLogin(response));

            /* go main page */
            // const {res} = response;
            // redirect(res, "/");
        } catch (error) {
            // yield put({type: OAUTH.LOGOUT,
            //     error});
        }
    };

export {
    logout,
    loginSaga
};
