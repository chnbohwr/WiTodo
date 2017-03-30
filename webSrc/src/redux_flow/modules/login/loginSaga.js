import { fork, put, call, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { webApi } from '../../../services/api';
import storage from '../../../storage';
import types from './LoginConstant';
import loginAction from './loginAction';

function* loginRequest({ payload }) {
  const { account, password } = payload;
  const data = yield call(webApi.login, account, password);

  if (data.tokenId) {
    yield put(loginAction.loginSuccess());
    yield storage.setItem('reduxPersist:auth', { token: data.tokenId });
    yield put(push('/'));
  } else {
    yield put(loginAction.loginFailure('Login Failure'));
  }
}

function* watchLoginRequest() {
  yield takeEvery(types.LOGIN_REQUEST, loginRequest);
}

export default [
  fork(watchLoginRequest),
];
