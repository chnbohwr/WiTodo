import { fork, put, call, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { webApi } from '../../../services/api';
import storage from '../../../storage';
import types from './authConstant';
import loginAction from './authAction';

function* loginRequest({ payload }) {
  const { account, password } = payload;
  const data = yield call(webApi.login, account, password);

  if (data.tokenId) {
    yield put(loginAction.loginSuccess());
    yield storage.setItem('reduxPersist:auth', { token: data.tokenId });
    yield put(loginAction.loginFailure(''));
    yield put(push('/'));
  } else {
    yield put(loginAction.loginFailure('Login Failure'));
  }
}

function* logoutRequest() {
  yield storage.removeItem('reduxPersist:auth');
  yield put(push('/login'));
}

function* watchLoginRequest() {
  yield takeEvery(types.LOGIN_REQUEST, loginRequest);
}

function* watchLogoutRequest() {
  yield takeEvery(types.LOGOUT_REQUEST, logoutRequest);
}

export default [
  fork(watchLoginRequest),
  fork(watchLogoutRequest),
];
