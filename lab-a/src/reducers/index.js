// type
// const FETCH_BOARDS = "FETCH_BOARDS";
// const FETCH_BOARDS_FULFILLED = "FETCH_BOARDS_FULFILLED";
// const FETCH_BOARDS_REJECTED = "FETCH_BOARDS_REJECTED";
import * as types from '../type/'
// reducer => store
// View -> Action -> Dispatcher -> Store(Middleware -> Reducer) -> View
// state => ui => action => reducer => store => state
// state에 저장? 액션->사가->액션->리듀서
const INITIAL_STATE = {
    user: {id: '', password: ''}
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

// function counter(state = 0, action) {
//     switch (action.type) {
//         case 'INCREMENT':
//             return state + 1
//         case 'INCREMENT_IF_ODD':
//             return (state % 2 !== 0) ? state + 1 : state
//         case 'DECREMENT':
//             return state - 1
//         default:
//             return state
//         }
//     }
// vuex 의 getters?
// const setStateLogin = (state = INITIAL_STATE, { type, payload, error }) => {
export default (state = INITIAL_STATE, { type, payload, error }) => {
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

// export default () => ({
//     counter,
//     setStateLogin
// })