//type
// const FETCH_BOARDS = "FETCH_BOARDS";
// const FETCH_BOARDS_FULFILLED = "FETCH_BOARDS_FULFILLED";
// const FETCH_BOARDS_REJECTED = "FETCH_BOARDS_REJECTED";

import * as types from '../type/'

// action :: pure object만을 반환하는 것
export const fetchBoards = () => ({
    type: types.FETCH_BOARDS
});

// saga에서 호출하는 액션
export const fetchBoardsFulfilled = boards => ({
    type: types.FETCH_BOARDS_FULFILLED,
    payload: boards
});

// saga에서 호출하는 액션
export const fetchBoardsRejected = error => ({
    type: types.FETCH_BOARDS_REJECTED,
    error
});

// vuex 의 actions?
export const token = user => ({
    type: types.TOKEN,
    payload: user
})
export const login = user => ({
    type: types.TOKEN,
    payload: user
})

export const logout = user => ({
    type: types.TOKEN,
    payload: user
})