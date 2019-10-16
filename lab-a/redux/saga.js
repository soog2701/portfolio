/* global fetch */

import { fork } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import watchUserAuthentication from './watchers';

es6promise.polyfill();


function * rootSaga () {  
  yield fork(watchUserAuthentication);
}

// export default rootSaga
export default rootSaga