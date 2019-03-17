// type
// const FETCH_BOARDS = "FETCH_BOARDS";
// const FETCH_BOARDS_FULFILLED = "FETCH_BOARDS_FULFILLED";
// const FETCH_BOARDS_REJECTED = "FETCH_BOARDS_REJECTED";
import { combineReducers } from 'redux';
import * as types from '../type/'
// reducer => store
// View -> Action -> Dispatcher -> Store(Middleware -> Reducer) -> View
// state => ui => action => reducer => store => state
// state에 저장? 액션->사가->액션->리듀서
const INITIAL_STATE = {
    boards: []
};

// export default (state = INITIAL_STATE, { type, payload, error }) => {
//     switch (type) {
//         case types.FETCH_BOARDS_FULFILLED:
//             return {
//                 ...state,
//                 boards: payload
//             };
//         case types.FETCH_BOARDS_REJECTED:
//             return {
//                 ...state,
//                 showError: true,
//                 error
//             };
//         default:
//             return state;
//     }
// };
// vuex 의 getters?
export const setStateLogin = (state = INITIAL_STATE, { type, payload, error }) => {
    switch (type) {
        case types.TOKEN:
            return {
                ...state,
                user: payload
            };
        case types.LOGIN:
            return {
                ...state,
                showError: true,
                error
            };
        case types.LOGOUT:
            return {
                ...state,
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
const defaultState = {
    isLoggedIn: false,
    fetchingUpdate: false,
    user: {}
};

export default combineReducers({
    user: setStateLogin
});