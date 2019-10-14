/* global fetch */

import { all, call, delay, put, take, takeLatest, fork, race } from 'redux-saga/effects'
// import {take, call, put, fork, race} from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'

// import { actionTypes, failureLogin, successLogin, failureLogout, successLogout } from './module/login'

import {
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  SET_AUTH,
  LOGOUT,
  CHANGE_FORM,
  REQUEST_ERROR
} from './module/login'

const auth = {
  login (username, password) {
    // if (auth.loggedIn()) return Promise.resolve(true)

    // // Post a fake request
    // return request.post('/login', {username, password})
    //   .then(response => {
    //     // Save token to local storage
    //     localStorage.token = response.token
    //     return Promise.resolve(true)
    //   })
    console.log({username, password})
  },
  register (username, password) {
    // Post a fake request
    // return request.post('/register', {username, password})
    //   // Log user in after registering
    //   .then(() => auth.login(username, password))
    console.log('register ===')
    auth.login(username, password)
  },
}

es6promise.polyfill();

// function * loginSaga() {
//   const action = yield take("LOGIN_REQUEST");
//   const { name, password } = action.payload;
//   try {
//     yield call(api.login, name, password);
//   } catch (err) {
//     yield put(failureLogin(err));
//     return;
//   }
//   yield put(successLogin());
// }

export function * authorize ({username, password, isRegistering}) {
  yield put({type: SENDING_REQUEST, sending: true})

  try {
    // const salt = genSalt(username)
    // const hash = hashSync(password, salt)
    const salt = '1username'
    const hash = '2password'
    let response

    if (isRegistering) {
      response = yield call(auth.register, username, hash)
    } else {
      response = yield call(auth.login, username, hash)
    }

    return response
  } catch (error) {
    console.log('hi')
    yield put({type: REQUEST_ERROR, error: error.message})

    return false
  } finally {
    yield put({type: SENDING_REQUEST, sending: false})
  }
}

export function * loginFlow () {
  
  while (true) {
    const request = yield take(LOGIN_REQUEST)
    const {username, password} = request.data

    const winner = yield race({
      auth: call(authorize, {username, password, isRegistering: false}),
      logout: take(LOGOUT)
    })

    if (winner.auth) {
      yield put({type: SET_AUTH, newAuthState: true}) // User is logged in (authorized)
      yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}}) // Clear form
      forwardTo('/dashboard') // Go to dashboard page
    }
  }
}


export function * registerFlow () {
  while (true) {
    const request = yield take(REGISTER_REQUEST)
    const {username, password} = request.data

    const wasSuccessful = yield call(authorize, {username, password, isRegistering: true})

    if (wasSuccessful) {
      yield put({type: SET_AUTH, newAuthState: true}) // User is logged in (authorized) after being registered
      yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}}) // Clear form
      forwardTo('/dashboard') // Go to dashboard page
    }
  }
}

function * rootSaga () {
  // yield all([
  //   call(loginSaga),
  //   // takeLatest(actionTypes.LOAD_DATA, loadDataSaga)
  // ])
  yield fork(loginFlow)
  // yield fork(logoutFlow)
  yield fork(registerFlow)
}

// export default rootSaga
export default rootSaga