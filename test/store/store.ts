import {createStore, applyMiddleware, Store, Middleware, StoreEnhancer} from "redux";
import {MakeStore, createWrapper, Context} from "next-redux-wrapper";
import createSagaMiddleware, {Task} from "redux-saga";
import {composeWithDevTools} from "redux-devtools-extension";

import rootReducer, {RootState} from "./root-reducer";
import rootSaga from "./root-saga";
import logger from "redux-logger";

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
        if (process.env.NODE_ENV !== "production") {
            return composeWithDevTools(applyMiddleware(...middleware));
        }
        return applyMiddleware(...middleware);
    },
    sagaMiddleware = createSagaMiddleware(),
    initStore :MakeStore<RootState> = (context: Context) => {
        const store = createStore(rootReducer, bindMiddleware([
            sagaMiddleware,
            logger
        ]));

        (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
        return store;
    };

export interface SagaStore extends Store {
    sagaTask?: Task;
}
export {initStore};
export const wrapper = createWrapper<RootState>(initStore, {debug: true});
