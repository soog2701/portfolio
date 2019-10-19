import { takeLatest, takeEvery, all } from 'redux-saga/effects';
import { loginSaga, logout } from './authenticationSaga';
import { exceptionSaga } from './exceptionSaga';

import { actionTypes as loginType } from './module/login'
import { actionTypes as exception } from './module/exception'

export default function* watchUserAuthentication() { 
  // yield takeEvery(POST_SOMETHING, apiSaga.bind(null, api.postSomething)); // post
  // yield takeLatest(GET_SOMETHING, apiSaga.bind(null, api.getSomething)); // get
  yield takeEvery(exception.EXCEPTION_REQUEST, exceptionSaga);
  yield takeLatest(loginType.LOGOUT_REQUEST, logout); // logout
  yield takeLatest(loginType.LOGIN_REQUEST, loginSaga); // login  
}