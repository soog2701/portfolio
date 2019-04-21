//type
// const FETCH_BOARDS = "FETCH_BOARDS";
// const FETCH_BOARDS_FULFILLED = "FETCH_BOARDS_FULFILLED";
// const FETCH_BOARDS_REJECTED = "FETCH_BOARDS_REJECTED";

import * as types from '../type/'

// action :: pure object만을 반환하는 것
export const fetchBoards = () => ({
    type: types.FETCH_BOARDS
});

// saga에서 호출하는 액션
export const fetchBoardsFulfilled = boards => ({
    type: types.FETCH_BOARDS_FULFILLED,
    payload: boards
});

// saga에서 호출하는 액션
export const fetchBoardsRejected = error => ({
    type: types.FETCH_BOARDS_REJECTED,
    error
});

// vuex 의 actions?
export const token = key => {
  return {
    type: types.TOKEN,
    payload: {key: key}
  }
}
export const login = user => {
  return {
    type: types.LOGIN,
    payload: user
  }
}

export const logout = () => {
  return {type: types.LOGOUT}
}

export function setAuthState (newAuthState) {
  return {type: types.SET_AUTH, newAuthState}
}
export function sendingRequest (sending) {
  return {type: types.SENDING_REQUEST, sending}
}
export function loginRequest (data) {
  return {type: types.LOGIN_REQUEST, data}
}

export function registerRequest (data) {
  return {type: types.REGISTER_REQUEST, data}
}

export function requestError (error) {
  return {type: types.REQUEST_ERROR, error}
}

export function clearError () {
  return {type: types.CLEAR_ERROR}
}

export function changeForm (newFormState) {
  return {type: types.CHANGE_FORM, newFormState}
}