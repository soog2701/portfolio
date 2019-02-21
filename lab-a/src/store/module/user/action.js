import axios from 'axios'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

const userConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    LOGOUT: 'USERS_LOGOUT',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE'
};

export const userActions = {
    login,
    logout,
    getAll
};

let dumyService = (duration) => {
    let service = new Promise(function(resolve) {
        setTimeout(resolve, duration);
    })
    return {
        login (username, password) {
            return service.then(username, password => {
                return {user: 'admin'}
            })
        },
        logout () {
            return ''
        },
        getAll () {
            return service.then(res => {
                return 'token'
            })
        }
    }
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        dumyService(300).login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    dumyService(0).logout();
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return dispatch => {
        dispatch(request());

        dumyService(300).getAll()
            .then(
                users => dispatch(success(users)),
                error => { 
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

export function fetchUser(id) {
    return dispatch => {
        dispatch(requestUser(id));
        let dumy = (duration) => {
            return new Promise(function(resolve) {
                setTimeout(resolve, duration);
            })
        }
        dumy(300).then(res => {
            const { payload, error } = res;
            if (payload && !error) {
                dispatch(successUser(payload));
            } else {
                dispatch(failureUser(error));
            }
        });
    };
}