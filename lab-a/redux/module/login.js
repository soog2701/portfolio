// 액션 타입 정의
export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    FAILURELOGIN: 'FAILURELOGIN',
    SUCCESSLOGIN: 'SUCCESSLOGIN',
    FAILURELOGOUT: 'FAILURELOGOUT',
    SUCCESSLOGOUT: 'SUCCESSLOGOUT',
}
export const CHANGE_FORM = 'CHANGE_FORM'
export const SET_AUTH = 'SET_AUTH'
export const SENDING_REQUEST = 'SENDING_REQUEST'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const LOGOUT = 'LOGOUT'
export const REQUEST_ERROR = 'REQUEST_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

// **** 액션 생섬함수 정의
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
const loginInitialState = {
    login: false,
    error: false,
}

// // **** 리듀서 작성
function reducer (state = loginInitialState, action) {
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
            return state
    }
}

/**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
export function changeForm (newFormState) {
    return {type: CHANGE_FORM, newFormState}
}
  
/**
 * Sets the authentication state of the application
* @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
*/
export function setAuthState (newAuthState) {
    return {type: SET_AUTH, newAuthState}
}
  
/**
   * Sets the `currentlySending` state, which displays a loading indicator during requests
   * @param  {boolean} sending True means we're sending a request, false means we're not
   */
export function sendingRequest (sending) {
    return {type: SENDING_REQUEST, sending}
}

/**
   * Tells the app we want to log in a user
   * @param  {object} data          The data we're sending for log in
   * @param  {string} data.username The username of the user to log in
   * @param  {string} data.password The password of the user to log in
   */
export function loginRequest (data) {
    return {type: LOGIN_REQUEST, data}
}

/**
   * Tells the app we want to log out a user
   */
export function logout () {
    return {type: LOGOUT}
}

/**
   * Tells the app we want to register a user
   * @param  {object} data          The data we're sending for registration
   * @param  {string} data.username The username of the user to register
   * @param  {string} data.password The password of the user to register
   */
export function registerRequest (data) {
    return {type: REGISTER_REQUEST, data}
}

/**
   * Sets the `error` state to the error received
   * @param  {object} error The error we got when trying to make the request
   */
export function requestError (error) {
    return {type: REQUEST_ERROR, error}
}

/**
 * Sets the `error` state as empty
 */
export function clearError () {
    return {type: CLEAR_ERROR}
}

export default reducer