import axios from 'axios';
import { push } from 'connected-react-router';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { LOAD_POST_FAILURE, LOAD_POST_REQUEST } from '../types';

// Load all posts
const loadPostApi = () => {
  return axios.get('/api/post');
};

function* loadPosts() {
  try {
    const result = yield call(loadPostApi);
    yield put({
      type: LOAD_POST_REQUEST,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_POST_FAILURE,
      payload: e,
    });
    yield push('/');
  }
}

function* watchLoadPosts() {
  yield takeEvery(LOAD_POST_REQUEST, loadPosts);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts)]);
}
