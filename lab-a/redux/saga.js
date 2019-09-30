/* global fetch */

import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'

import { actionTypes, failureLogin, successLogin, failureLogout, successLogout } from './module/login'

es6promise.polyfill()

function * loginSaga() {
  const action = yield take("LOGIN_REQUEST");
  const { name, password } = action.payload;
  try {
    yield call(api.login, name, password);
  } catch (err) {
    yield put(failureLogin(err));
    return;
  }
  yield put(successLogin());
}

function * rootSaga () {
  yield all([
    call(loginSaga),
    // takeLatest(actionTypes.LOAD_DATA, loadDataSaga)
  ])
}

// export default rootSaga
export default rootSaga