// 액션 타입 정의
export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    FAILURELOGIN: 'FAILURELOGIN',
    SUCCESSLOGIN: 'SUCCESSLOGIN',
    FAILURELOGOUT: 'FAILURELOGOUT',
    SUCCESSLOGOUT: 'SUCCESSLOGOUT',
}
// **** 액션 생섬함수 정의
export const loginRequest = ({username, password}) => ({
    type: actionTypes.LOGIN_REQUEST,
    username, 
    password
});
export const loginoutRequest = () => ({
    type: actionTypes.LOGOUT_REQUEST    
});
export const failureLogin = error => ({
    type: actionTypes.FAILURELOGIN,
    error
});
export const successLogin = ({token, refresh}) => ({
    type: actionTypes.SUCCESSLOGIN,
    token, refresh
});
export const failureLogout = error => ({
    type: actionTypes.FAILURELOGOUT,
    error
})
export const successLogout = () => ({
    type: actionTypes.SUCCESSLOGOUT
})

// **** 초기상태 정의
export const loginInitialState = {
    login: false,
    error: false,
    token: '',
    refresh: ''
}

// **** 리듀서 작성
function reducer (state = loginInitialState, action) {
    const {token, refresh} = action;

    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                error: action.error ,login: 'LOGIN_REQUEST' 
            }
        case actionTypes.LOGOUT_REQUEST: 
            return{
                ...state,
                error: action.error ,login: 'LOGOUT_REQUEST'
            }   
        case actionTypes.FAILURELOGIN:
            return {
                ...state,
                error: action.error ,login: 'FAILURELOGIN'
            }
        case actionTypes.SUCCESSLOGIN:
            return {
                ...state,
                token, refresh,
                login: 'SUCCESSLOGIN'
            }
        case actionTypes.FAILURELOGOUT:
            return {
                ...state,
                error: action.error, login: 'FAILURELOGOUT'
            }
        case actionTypes.SUCCESSLOGOUT:
            return {
                ...state,
                login: 'SUCCESSLOGOUT'
            }
        default:
            return state
    }
}


export default reducer