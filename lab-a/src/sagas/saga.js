// https://gracefullight.github.io/2017/12/06/Why-redux-saga/
// saga는 action을 listen(watch)한다.
import { runSaga } from 'redux-saga'
import { all, call, take, spawn, put, select, takeEvery, takeLatest } from "redux-saga/effects";
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
export function* root() {
  yield spawn(watchBoard);
}

// action => saga => action => reducer 로 연결되는 saga가 완성

///// login 더미작업 vuex 의 mutations?
function* loginSaga(dispatch) {
  try {
    // const { data } = yield axios.get("/boards"); // test
    const { data } = {data: {id: 'test', password: '123'}}
    // const json = yield fetch('https://newsapi.org/v1/articles?source= cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
    //     .then(response => response.json())
    // console.log(json)
    // yield put(actions.login(data));  /// 무한루프...
    // yield put({ type: "LOGIN", user: data}); //
    // const products = yield take(actions.login(data))
    
    // dispatch({ type: 'LOGIN', products })

  } catch (error) {
    yield put(actions.logout(error.response));
  }
}


function* watchLogin() {
  let s = yield select()
  console.log('state', s)
  // yield takeEvery(types.LOGIN, loginSaga);
  yield takeLatest(types.LOGIN, loginSaga);
}

export default function* loginRoot() {
  // yield spawn(watchLogin);
  yield all([
    loginSaga(),
    watchLogin()
  ])
}

