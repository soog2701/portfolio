// https://gracefullight.github.io/2017/12/06/Why-redux-saga/
// saga는 action을 listen(watch)한다.
// import { runSaga } from 'redux-saga'
import { all, spawn, put, select, takeEvery, takeLatest, call, take, race, fork } from "redux-saga/effects"; // call, take, , fork
import * as actions from "../actions";
import axios from "axios";
import {hashSync} from 'bcryptjs'
import genSalt from '../auth/salt.js'
import auth from '../auth/index.js'

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
export function* root_old() {
  yield spawn(watchBoard);
}

// action => saga => action => reducer 로 연결되는 saga가 완성
const delay = (ms) => new Promise(res => setTimeout(res, ms))
///// login 더미작업 vuex 의 mutations?

function* loginSaga(dispatch) {
  try {
    // let token = yield call(delay, 1000)
    // yield call(delay, 1000) // call(fn, arg1, arg2)
    yield delay(1000)
    let token = {payload:{key: 'testkey'}}
    
    // yield put({type: 'TOKEN'}, token) //, token LOGIN TOKEN login success //  {PUT: {type: 'TOKEN'}}
    // console.log('www----' ,dispatch)
    yield put({type: 'LOGIN'}, token)
    // return token
  } catch(error) {
    yield put({type: 'LOGOUT', error}) // login error
  }
}

function* watchLogin() {
  let s = yield select()
  console.log('state========', s)
  // yield takeEvery(types.LOGIN, loginSaga);
  yield takeLatest('LOGIN', loginSaga);
}

export function* loginRoot() {
  // yield spawn(watchLogin);
  yield all([
    // loginSaga(),
    watchLogin()
  ])
}

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
export function * authorize ({username, password, isRegistering}) {
  // We send an action that tells Redux we're sending a request
  yield put({type: types.SENDING_REQUEST, sending: true})

  // We then try to register or log in the user, depending on the request
  try {
    const salt = genSalt(username)
    const hash = hashSync(password, salt)
    let response

    // For either log in or registering, we call the proper function in the `auth`
    // module, which is asynchronous. Because we're using generators, we can work
    // as if it's synchronous because we pause execution until the call is done
    // with `yield`!
    if (isRegistering) {
      response = yield call(auth.register, username, hash)
    } else {
      response = yield call(auth.login, username, hash)
    }

    return response
  } catch (error) {
    console.log('hi')
    // If we get an error we send Redux the appropiate action and return
    yield put({type: types.REQUEST_ERROR, error: error.message})

    return false
  } finally {
    console.log('login?')    
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({type: types.SENDING_REQUEST, sending: false})
  }
}

/**
 * Effect to handle logging out
 */
export function * logout () {
  // We tell Redux we're in the middle of a request
  yield put({type: types.SENDING_REQUEST, sending: true})

  // Similar to above, we try to log out by calling the `logout` function in the
  // `auth` module. If we get an error, we send an appropiate action. If we don't,
  // we return the response.
  try {
    const response = yield call(auth.logout)
    yield put({type: types.SENDING_REQUEST, sending: false})

    return response
  } catch (error) {
    yield put({type: types.REQUEST_ERROR, error: error.message})
  }
}

/**
 * Log in saga
 */
export function * loginFlow () {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    const request = yield take(types.LOGIN_REQUEST)
    const {username, password} = request.data

    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    const winner = yield race({
      auth: call(authorize, {username, password, isRegistering: false}),
      logout: take(types.LOGOUT)
    })

    // If `authorize` was the winner...
    if (winner.auth) {
      // ...we send Redux appropiate actions
      yield put({type: types.SET_AUTH, newAuthState: true}) // User is logged in (authorized)
      yield put({type: types.CHANGE_FORM, newFormState: {username: '', password: ''}}) // Clear form
      console.log('============logout')
      // forwardTo('/dashboard') // Go to dashboard page // history 관련
    }
  }
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
export function * logoutFlow () {
  while (true) {
    yield take(types.LOGOUT)
    yield put({type: types.SET_AUTH, newAuthState: false})

    yield call(logout)
    // forwardTo('/') // history 관련
  }
}
/**
 * Register saga
 * Very similar to log in saga!
 */
export function * registerFlow () {
  while (true) {
    // We always listen to `REGISTER_REQUEST` actions
    const request = yield take(types.REGISTER_REQUEST)
    const {username, password} = request.data

    // We call the `authorize` task with the data, telling it that we are registering a user
    // This returns `true` if the registering was successful, `false` if not
    const wasSuccessful = yield call(authorize, {username, password, isRegistering: true})

    // If we could register a user, we send the appropiate actions
    if (wasSuccessful) {
      yield put({type: types.SET_AUTH, newAuthState: true}) // User is logged in (authorized) after being registered
      yield put({type: types.CHANGE_FORM, newFormState: {username: '', password: ''}}) // Clear form
      // forwardTo('/dashboard') // Go to dashboard page // history 관련
      console.log('============logout')
    }
  }
}
// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function * root () {
  yield fork(loginFlow)
  yield fork(logoutFlow)
  yield fork(registerFlow)
}
// https://github.com/sotojuan/saga-login-flow/blob/master/app/sagas/index.js