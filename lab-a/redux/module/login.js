// 액션 타입 정의
export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    FAILURELOGIN: 'FAILURELOGIN',
    SUCCESSLOGIN: 'SUCCESSLOGIN',
    FAILURELOGOUT: 'FAILURELOGOUT',
    SUCCESSLOGOUT: 'SUCCESSLOGOUT',
}
// **** 액션 생섬함수 정의
export const loginRequest = (name, password) => ({
    type: actionTypes.LOGIN_REQUEST,
    name, 
    password
});
export const failureLogin = error => ({
    type: actionTypes.FAILURELOGIN,
    error
});
export const successLogin = () => ({
    type: actionTypes.SUCCESSLOGIN
});
export const failureLogout = error => ({
    type: actionTypes.FAILURELOGOUT,
    error
})
export const successLogout = () => ({
    type: actionTypes.SUCCESSLOGOUT
})

// **** 초기상태 정의
const loginInitialState = {
    login: false,
    error: false,
}

// **** 리듀서 작성
function reducer (state = loginInitialState, action) {
    switch (action.type) {
        case actionTypes.FAILURELOGIN:
            return {
                ...state,
                ...{ error: action.error ,login: false }
            }
        case actionTypes.SUCCESSLOGIN:
            return {
                ...state,
                ...{ login: true }
            }
        case actionTypes.FAILURELOGOUT:
            return {
                ...state,
                ...{ error: action.error, login: false }
            }
        case actionTypes.SUCCESSLOGOUT:
            return {
                ...state,
                ...{ login: false }
            }
        default:
            return state
    }
}


export default reducer