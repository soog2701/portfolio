// action
const LOGINSUCCESS = 'login/LOGINSUCCESS';
const LOGINFAIL = 'login/LOGINFAIL';
const LOGOUTSUCCESS = 'login/LOGOUTSUCCESS';
const LOGOUTFAIL = 'login/LOGOUTFAIL';

export const login = () => ({ type: LOGINSUCCESS, type: LOGINFAIL });
export const logout = () => ({ type: LOGOUTSUCCESS, type: LOGOUTFAIL });

const initialState = '';

// reducer
const loginSet = (state = initialState, action) => {
    switch (action.type) {
        case LOGINSUCCESS:
            return state = 'login';
        case LOGINFAIL:
            return state = 'loginfail';
        case LOGOUTSUCCESS:
            return state = 'logout';
        case LOGOUTFAIL:
            return state = 'logoutfail';
        default:
            return state;
    }
  };
  
  export default loginSet;