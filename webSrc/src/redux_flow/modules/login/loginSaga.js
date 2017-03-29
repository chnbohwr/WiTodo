import { fork, take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import loginAction from './loginAction';

const x = 0;

function* watchLoginRequest() {
  while (x === 0) {
    const { payload } = yield take(loginAction.loginRequest);
    yield put(loginAction.loginSuccess());
    yield sessionStorage.setItem('isLogin', true);
    yield put(push('/todoList'));
  }
}

export default [
  fork(watchLoginRequest),
];
