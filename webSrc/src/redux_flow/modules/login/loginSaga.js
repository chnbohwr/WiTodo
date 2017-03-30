import { fork, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import types from './LoginConstant';
import loginAction from './loginAction';

function* loginRequest() {
  yield put(loginAction.loginSuccess());
  yield sessionStorage.setItem('isLogin', true);
  yield put(push('/todoList'));
}

function* watchLoginRequest() {
  yield takeEvery(types.LOGIN_REQUEST, loginRequest);
}

export default [
  fork(watchLoginRequest),
];
