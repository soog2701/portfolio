import {OAUTH} from "../../types"; /*  액션 type 선언 */

interface UserState {
    token?: string;
    refreshToken?: string;
    username?: string;
}

interface LoginAction {
    type?: string;
    payload?: {
        token?: string;
        refreshToken?: string;
        username?: string;
    };
}

const initialState: UserState = {
    token: "",
    refreshToken: "",
    username: ""
},

    /* 액션 생성 함수 선언 */
    createAction = function <T extends string, U, K extends string> (type: T, key: K, payload: U) {
        return ({
            type,
            [key]: payload
        }) as { type: T; } & { [P in K]: U };
    },
    setUser = () => ({type: OAUTH.USER} as const),
    setToken = () => ({type: OAUTH.TOKEN} as const),
    setRefresh = () => ({type: OAUTH.REFRESH} as const),
    setLogin = (diff: UserState) :LoginAction => createAction(OAUTH.LOGIN, "payload", diff),
    setLogout = () => ({type: OAUTH.LOGIN} as const),

    /*  */
    setOauth = function (state: UserState = initialState, action: LoginAction) :UserState {
        switch (action.type) {
        case OAUTH.USER:
            return {username: state.username};
        case OAUTH.TOKEN:
            return {token: state.token};
        case OAUTH.REFRESH:
            return {refreshToken: state.refreshToken};
        case OAUTH.LOGIN:
            return action.payload as UserState;
        case OAUTH.LOGOUT:
            return {
                token: "",
                refreshToken: "",
                username: ""
            };
        default:
            return state;
        }
    };

/* type */
/* type LoginAction =
    | ReturnType<typeof setUser>
    | ReturnType<typeof setToken>
    | ReturnType<typeof setRefresh>
    | ReturnType<typeof setLogin>
    | ReturnType<typeof setLogout>; */


export {
    setUser,
    setToken,
    setRefresh,
    setLogin,
    setLogout,
    setOauth
};
