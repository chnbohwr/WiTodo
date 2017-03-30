import { fork, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import storage from '../../../storage';
import types from './LoginConstant';
import loginAction from './loginAction';

function* loginRequest() {
  yield put(loginAction.loginSuccess());
  yield storage.setItem('reduxPersist:auth', { token: '123', roleId: '0' });
  yield put(push('/'));
}

function* watchLoginRequest() {
  yield takeEvery(types.LOGIN_REQUEST, loginRequest);
}

export default [
  fork(watchLoginRequest),
];
