import {EXCEPTION} from "../../types"; /*  액션 type 선언 */
import {HYDRATE} from "next-redux-wrapper";

const initialState: alertState = {
    ui: []
},

    /* 액션 생성 함수 선언 */
    alert = (data:dataObj): alertAction => ({
        type: EXCEPTION.ALERT,
        payload: data
    }),
    exception = (data:dataObj): alertAction => ({
        type: EXCEPTION.EXCEPTION,
        payload: data
    }),
    hide = (index:number) => ({
        type: EXCEPTION.HIDE,
        index
    } as const),

    /* reducer */
    alerts = function (state: alertState = initialState, action: ActionTypes) : alertState {
        switch (action.type) {

        /* | { type: typeof HYDRATE; payload: dataObj }case HYDRATE:
            return {...state,
                ...(action as alertAction).payload}; */
        case EXCEPTION.ALERT:
            state.ui.push({
                comp: "AlertDialog",
                index: state.ui.length,
                data: {
                    isVisible: true,
                    title: "알림",
                    class: (action as alertAction).payload.class || "",
                    message: (action as alertAction).payload.message || "",
                    callback: (action as alertAction).payload.callback
                }
            });
            return state;
        case EXCEPTION.EXCEPTION:
            state.ui.push({
                comp: "ExceptionDialog",
                index: state.ui.length,
                data: {
                    isVisible: true,
                    title: "에러",
                    class: (action as alertAction).payload.class,
                    message: (action as alertAction).payload.message,
                    callback: (action as alertAction).payload.callback
                }
            });
            return state;
        case EXCEPTION.HIDE:
            state.ui[(action as ReturnType<typeof hide>).index].data.isVisible = false;
            state.ui = state?.ui?.splice((action as ReturnType<typeof hide>).index, 1);
            return state;
        default:
            return state;
        }
    };

/* type */
interface uiObj {
    comp?: string;
    index?: number;
    data: dataObj;
}

export interface dataObj {
    isVisible?: boolean;
    title?: string;
    class?: string;
    message?: string;
    callback?: callbackArray;
}

interface alertAction {
    type: string;
    payload: dataObj;
}

type alertState = {
    ui: uiArray;
}

type uiArray = Array<uiObj>
type callbackArray = Array<[]>

export type ActionTypes =
 | alertAction
 | ReturnType<typeof hide>;


export {
    alert,
    exception,
    hide,
    alerts
};
