import { takeLatest } from 'redux-saga/effects';
import { loginSaga } from './authenticationSaga';

import { actionTypes } from './module/login'

export default function* watchUserAuthentication() { 
  yield takeLatest(actionTypes.LOGIN_REQUEST, loginSaga);
}