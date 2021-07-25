import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../types';

// LOGIN

const loginUserApi = (loginData) => {
  console.log(loginData, 'loginData');
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  return axios.post('api/auth', loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserApi, action.payload);
    console.log(result);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

// LOGOUT

function* logout(action) {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
    console.log(e);
  }
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, loginUser);
}

// Load user

const loadUserApi = (loadData) => {
  const token = loadData.payload;
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  if (token) {
    config.headers.Authorization = token;
  }
  return axios.get('api/user/detail', config);
};

function* loadUser(action) {
  try {
    const result = yield call(loadUserApi, action.payload);
    yield put({
      type: LOAD_USER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

export default function* authSaga() {
  yield all([fork(watchLoginUser), fork(watchLogout), fork(watchLoadUser)]);
}
