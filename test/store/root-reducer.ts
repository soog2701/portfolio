import {combineReducers} from "redux";
import {alerts} from "./module/exception";


/* import login from '../login/login';
import exception from '../exception/exception'; */
const rootReducer = combineReducers({
    alerts

    /* 다른 리듀서를 만들게되면 여기에 넣어줌 */
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
