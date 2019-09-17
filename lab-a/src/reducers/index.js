// type
// const FETCH_BOARDS = "FETCH_BOARDS";
// const FETCH_BOARDS_FULFILLED = "FETCH_BOARDS_FULFILLED";
// const FETCH_BOARDS_REJECTED = "FETCH_BOARDS_REJECTED";
import * as types from '../type/'
import auth from '../auth'
// reducer => store
// View -> Action -> Dispatcher -> Store(Middleware -> Reducer) -> View
// state => ui => action => reducer => store => state
// state에 저장? 액션->사가->액션->리듀서
const INITIAL_STATE = {
    user: {id: '', password: ''}
};

// vuex 의 getters?
// const setStateLogin = (state = INITIAL_STATE, { type, payload, error }) => {
let reducerold = (state = INITIAL_STATE, { type, payload, error }) => {
    switch (type) {
        case types.TOKEN:
            return {
                ...state,
                user: payload
            };
        case types.LOGIN:
            return {
                // ...state,
                // user: payload,
                // showError: true,
                // error
                ...state,
                user: payload
            };
        case types.LOGOUT:
            return {
                ...state,
                user: payload,
                showError: true,
                error
            };
        case types.REFRESH:
            return {
                ...state,
                user: payload,
                error
            };
        default:
            return state;
    }
}

let initialState = {
  formState: {
    username: '',
    password: ''
  },
  error: '',
  islogin: false,
  currentlySending: false,
  loggedIn: auth.loggedIn()
}
// Takes care of changing the application state
function reducers (state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_FORM:
      return {...state, formState: action.newFormState}
    case types.SET_AUTH:
      return {...state, loggedIn: action.newAuthState}
    case types.SENDING_REQUEST:
      return {...state, currentlySending: action.sending}
    case types.REQUEST_ERROR:
      return {...state, error: action.error}
    case types.CLEAR_ERROR:
      return {...state, error: ''}
    case types.LOGIN_REQUEST:
      return {...state, islogin: true} // 2019-04-28 값 추가
    default:
      return state
  }
}

// export default () => ({
//     counter,
//     setStateLogin
// })

export default reducers