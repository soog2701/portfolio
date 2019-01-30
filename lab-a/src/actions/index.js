let nextTodoId = 0
export const addTodo = text => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
})

export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
})

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}
// 액션 생산자는 단지 액션을 반환 / 실제로 액션을 보내려면 결과값을 dispatch() 함수에 넘깁니다:
export const Login = (isAuthenticated, id, token) => ({
    type: 'LOGIN',
    isAuthenticated,
    id,
    token
})
export const Logout = (isAuthenticated, id, token) => ({
    type: 'LOGOUT',
    isAuthenticated,
    id,
    token
})