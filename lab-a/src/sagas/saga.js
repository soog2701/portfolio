import { all, spawn, put, select, takeEvery, takeLatest, call, take, race, fork } from "redux-saga/effects"; // call, take, , fork
import * as actions from "../actions";
import axios from "axios";
import {hashSync} from 'bcryptjs'
import genSalt from '../auth/salt.js'
import auth from '../auth/index.js'
import history from './../history';
//type
// const FETCH_BOARDS = "FETCH_BOARDS";
// const FETCH_BOARDS_FULFILLED = "FETCH_BOARDS_FULFILLED";
// const FETCH_BOARDS_REJECTED = "FETCH_BOARDS_REJECTED";
import * as types from '../type/'

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
  
  while (true) {
    const request = yield take(types.LOGIN_REQUEST)
    const {username, password} = request.payload // request.data
    
    const winner = yield race({
      auth: call(authorize, {username, password, isRegistering: false}),
      logout: take(types.LOGOUT)
    })
    console.log('============login===============')
    // history.push('/') // 2019-04-23 리프레시 확인필요 => 2019-04-28 react-router-redux 설치 => 삭제후 history.replace 적용
    history.replace('/list'); // 
    // If `authorize` was the winner...
    if (winner.auth) {
      // ...we send Redux appropiate actions
      yield put({type: types.SET_AUTH, newAuthState: true}) // User is logged in (authorized)
      yield put({type: types.CHANGE_FORM, newFormState: {username: '', password: ''}}) // Clear form      
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
export default function * root () {
  yield fork(loginFlow)
  yield fork(logoutFlow)
  yield fork(registerFlow)
}
// https://github.com/sotojuan/saga-login-flow/blob/master/app/sagas/index.js