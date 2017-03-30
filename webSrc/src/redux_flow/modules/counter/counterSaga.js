import { fork, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import types from './counterConstant';
import counterAction from './counterAction';

function* delayIncrement({ payload }) {
  yield delay(3000);
  yield put(counterAction.increment(payload));
}

function* watchIncrement() {
  yield takeEvery(types.DELAY_INCREMENT, delayIncrement);
}

export default [
  fork(watchIncrement),
];
