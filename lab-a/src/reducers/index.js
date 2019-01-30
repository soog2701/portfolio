import { combineReducers } from 'redux'

import visibilityFilter from './visibilityFilter'

const userin = (state = 'LOGIN', action) => {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isAuthenticated: action.isAuthenticated,
                id: action.id,
                token: action.token
            });
        default:
            return state
    }
}
const userout = (state = 'LOGOUT', action) => {
    switch (action.type) {
        case 'LOGOUT':
            return Object.assign({}, state, {
                isAuthenticated: action.isAuthenticated,
                id: action.id,
                token: action.token
            });
        default:
            return state
    }
}
export default combineReducers({
    visibilityFilter,
    userin,
    userout
})