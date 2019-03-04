//type
const FETCH_BOARDS = "FETCH_BOARDS";
const FETCH_BOARDS_FULFILLED = "FETCH_BOARDS_FULFILLED";
const FETCH_BOARDS_REJECTED = "FETCH_BOARDS_REJECTED";

// action :: pure object만을 반환하는 것
export const fetchBoards = () => ({
    type: FETCH_BOARDS
});

// saga에서 호출하는 액션
export const fetchBoardsFulfilled = boards => ({
    type: FETCH_BOARDS_FULFILLED,
    payload: boards
});

// saga에서 호출하는 액션
export const fetchBoardsRejected = error => ({
    type: FETCH_BOARDS_REJECTED,
    error
});