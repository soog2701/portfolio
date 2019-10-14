webpackHotUpdate("static\\development\\pages\\_app.js",{

/***/ "./redux/module/login.js":
/*!*******************************!*\
  !*** ./redux/module/login.js ***!
  \*******************************/
/*! exports provided: actionTypes, CHANGE_FORM, SET_AUTH, SENDING_REQUEST, LOGIN_REQUEST, REGISTER_REQUEST, LOGOUT, REQUEST_ERROR, CLEAR_ERROR, changeForm, setAuthState, sendingRequest, loginRequest, logout, registerRequest, requestError, clearError, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionTypes", function() { return actionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_FORM", function() { return CHANGE_FORM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_AUTH", function() { return SET_AUTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SENDING_REQUEST", function() { return SENDING_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGIN_REQUEST", function() { return LOGIN_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGISTER_REQUEST", function() { return REGISTER_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGOUT", function() { return LOGOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_ERROR", function() { return REQUEST_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_ERROR", function() { return CLEAR_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeForm", function() { return changeForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAuthState", function() { return setAuthState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendingRequest", function() { return sendingRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginRequest", function() { return loginRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerRequest", function() { return registerRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestError", function() { return requestError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearError", function() { return clearError; });
// 액션 타입 정의
var actionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  FAILURELOGIN: 'FAILURELOGIN',
  SUCCESSLOGIN: 'SUCCESSLOGIN',
  FAILURELOGOUT: 'FAILURELOGOUT',
  SUCCESSLOGOUT: 'SUCCESSLOGOUT'
};
var CHANGE_FORM = 'CHANGE_FORM';
var SET_AUTH = 'SET_AUTH';
var SENDING_REQUEST = 'SENDING_REQUEST';
var LOGIN_REQUEST = 'LOGIN_REQUEST';
var REGISTER_REQUEST = 'REGISTER_REQUEST';
var LOGOUT = 'LOGOUT';
var REQUEST_ERROR = 'REQUEST_ERROR';
var CLEAR_ERROR = 'CLEAR_ERROR'; // **** 액션 생섬함수 정의
// export const loginRequest = (name, password) => ({
//     type: actionTypes.LOGIN_REQUEST,
//     name, 
//     password
// });
// export const failureLogin = error => ({
//     type: actionTypes.FAILURELOGIN,
//     error
// });
// export const successLogin = () => ({
//     type: actionTypes.SUCCESSLOGIN
// });
// export const failureLogout = error => ({
//     type: actionTypes.FAILURELOGOUT,
//     error
// })
// export const successLogout = () => ({
//     type: actionTypes.SUCCESSLOGOUT
// })
// // **** 초기상태 정의

var loginInitialState = {
  login: false,
  error: false
}; // // **** 리듀서 작성

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : loginInitialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    // case actionTypes.FAILURELOGIN:
    //     return {
    //         ...state,
    //         ...{ error: action.error ,login: false }
    //     }
    // case actionTypes.SUCCESSLOGIN:
    //     return {
    //         ...state,
    //         ...{ login: true }
    //     }
    // case actionTypes.FAILURELOGOUT:
    //     return {
    //         ...state,
    //         ...{ error: action.error, login: false }
    //     }
    // case actionTypes.SUCCESSLOGOUT:
    //     return {
    //         ...state,
    //         ...{ login: false }
    //     }
    default:
      return state;
  }
}
/**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */


function changeForm(newFormState) {
  return {
    type: CHANGE_FORM,
    newFormState: newFormState
  };
}
/**
 * Sets the authentication state of the application
* @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
*/

function setAuthState(newAuthState) {
  return {
    type: SET_AUTH,
    newAuthState: newAuthState
  };
}
/**
   * Sets the `currentlySending` state, which displays a loading indicator during requests
   * @param  {boolean} sending True means we're sending a request, false means we're not
   */

function sendingRequest(sending) {
  return {
    type: SENDING_REQUEST,
    sending: sending
  };
}
/**
   * Tells the app we want to log in a user
   * @param  {object} data          The data we're sending for log in
   * @param  {string} data.username The username of the user to log in
   * @param  {string} data.password The password of the user to log in
   */

function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    data: data
  };
}
/**
   * Tells the app we want to log out a user
   */

function logout() {
  return {
    type: LOGOUT
  };
}
/**
   * Tells the app we want to register a user
   * @param  {object} data          The data we're sending for registration
   * @param  {string} data.username The username of the user to register
   * @param  {string} data.password The password of the user to register
   */

function registerRequest(data) {
  return {
    type: REGISTER_REQUEST,
    data: data
  };
}
/**
   * Sets the `error` state to the error received
   * @param  {object} error The error we got when trying to make the request
   */

function requestError(error) {
  return {
    type: REQUEST_ERROR,
    error: error
  };
}
/**
 * Sets the `error` state as empty
 */

function clearError() {
  return {
    type: CLEAR_ERROR
  };
}
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

})
//# sourceMappingURL=_app.js.fdd3b1d40a21dbfa3f75.hot-update.js.map