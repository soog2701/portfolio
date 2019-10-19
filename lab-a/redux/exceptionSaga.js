import { call, put, select } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'

import { actionTypes, exceptionShow } from './module/exception'

import redirect from '../util/redirect'
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

export function* alertHide () {
    yield put({ type: actionTypes.EXCEPTION_HIDE, error });
}

export function * exceptionSaga(payload) {
    // let response;
    try {
        console.log('exceptionShow try', payload)
        // response = yield call(loginApi, payload); 
        yield put(exceptionShow(payload))
        // cookies.set('token', response.token);
        const state = yield select()
        console.log('exceptionShow state after', state)
        // // go main page
        // let res = response.res;
        // redirect(res, '/');
    } catch(error) {
        console.log('exceptionShow error')
        // yield put({ type: actionTypes.EXCEPTION_HIDE, error });
    }
}