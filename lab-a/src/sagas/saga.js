// https://gracefullight.github.io/2017/12/06/Why-redux-saga/
// saga는 action을 listen(watch)한다.

import { call, spawn, put, takeEvery } from "redux-saga/effects";
import * as actions from "../actions";
import axios from "axios";

//type
// const FETCH_BOARDS = "FETCH_BOARDS";
// const FETCH_BOARDS_FULFILLED = "FETCH_BOARDS_FULFILLED";
// const FETCH_BOARDS_REJECTED = "FETCH_BOARDS_REJECTED";
import * as types from '../type/'

function* fetchBoardsSaga() {
  // try catch finally 구문으로 오류 제어가 가능하다.
  try {
    // 이부분을 call 메소드를 이용해 테스트가 쉽게 바꿀 수 있다.
    // (yeild를 사용하기 때문에 next 명령어로 반복 가능하므로)
    // const { data } = yield call([axios, 'get'], '/boards')
    const { data } = yield axios.get("/boards");
    yield put(actions.fetchBoardsFulfilled(data));
  } catch (error) {
    yield put(actions.fetchBoardsRejected(error.response));
  }
}

function* watchBoard() {
  // type의 action이 실행되면 fetchBoardsSaga도 항상(Every) 실행한다
  yield takeEvery(types.FETCH_BOARDS, fetchBoardsSaga);
}

// 모든 listener(watcher)를 하나로 묶어준다.
// rootReducer에 묶어주는 그것과 같다고 보면 된다.
export default function* root() {
  yield spawn(watchBoard);
}

// action => saga => action => reducer 로 연결되는 saga가 완성

///// login 더미작업 vuex 의 mutations?
function* loginSaga() {
  try {
    // const { data } = yield axios.get("/boards"); // test
    const { data } = {data: {id: 'test', password: '123'}}
    console.log('loginRoot')
    yield put(actions.token(data));
  } catch (error) {
    yield put(actions.logout(error.response));
  }
}

function* watchLogin() {
  yield takeEvery(types.TOKEN, loginSaga);
}

export function* loginRoot() {
  yield spawn(watchLogin);
}

// const someAction = createAction('some action')

// function* someSaga() {
//   // make some async staff
// }

// export default function* saga() {
//   yield takeLatest(someAction.getType(), someSaga)
//   // and for each action the same staff ...
// }
