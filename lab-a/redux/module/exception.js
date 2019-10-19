// 액션 타입 정의
export const actionTypes = {
    EXCEPTION_REQUEST : 'EXCEPTION_REQUEST',
    EXCEPTION_SHOW: 'EXCEPTION_SHOW',
    EXCEPTION_HIDE: 'EXCEPTION_HIDE'
}
// **** 액션 생섬함수 정의
export const exceptionRequest = (payload) => ({
    type: actionTypes.EXCEPTION_REQUEST,
    payload
});
export const exceptionShow = (payload) => ({
    type: actionTypes.EXCEPTION_SHOW,    
    payload
});
export const exceptionHide = error => ({
    type: actionTypes.EXCEPTION_HIDE,
    error
});
// **** 초기상태 정의
export const exceptionInitialState = {
    isShow: false,
    error: '',
    message: ''
}
// **** 리듀서 작성
function reducer(state = exceptionInitialState, action) {
    switch (action.type) {
        case actionTypes.EXCEPTION_REQUEST:
            return {
                ...state,
                message: action.message,
                error: action.error
            }
        case actionTypes.EXCEPTION_SHOW:
            return {
                ...state,
                isShow : true,
                message: action.message,
                error: action.error
            }
        case actionTypes.EXCEPTION_HIDE:
            return {
                ...state,
                isShow : false,
                message: action.message,
                error: action.error
            }
        default:
            return state
    }
}
export default reducer