import { takeEvery, put, all, delay } from "redux-saga/effects";

export function* helloSaga() {
    console.log('Hello Sagas!')
}

export function* sagaLogin() {
    yield delay(1000);
    yield put({ type: "login/LOGINFAIL" });
}

export default function* rootSaga() {
    yield all([
      helloSaga(),
      sagaLogin()
    ])
  }