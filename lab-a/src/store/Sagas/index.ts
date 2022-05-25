import { all } from 'redux-saga/effects';


export default function* rootSaga() {
  yield all([ // 모든 saga 를 한번에 관리
    // ...testSaga,
  ]);
}