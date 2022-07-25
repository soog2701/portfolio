import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { LOADNEWS } from "../Type/news";
import { loadNews } from '../Actions/news'

function* loadNewsSaga() {
  try {
    const result: AxiosResponse<{ data: object }> = yield call(
      $api.get, ''
    );
    yield put(loadNews(result.data));
  } catch (err) {
    yield put(loadNews([]));
  }
}

function* watchChangeCount() {
  yield takeLatest(LOADNEWS, loadNewsSaga);
}

export default function* counterSaga() {
  yield all([fork(watchChangeCount)]);
}