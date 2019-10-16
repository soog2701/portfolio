// 액션 타입 정의
export const actionTypes = {
    EXCEPTION_REQUEST : 'EXCEPTION_REQUEST'
}
// **** 액션 생섬함수 정의
export const exceptionRequest = ({isShow, message}) => ({
    type: actionTypes.EXCEPTION_REQUEST,
    isShow,
    message
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
                isShow,
                message,
                error: action.error
            }
        default:
            return state
    }
}
export default reducer