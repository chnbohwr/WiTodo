import { fork, take, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { testApi } from '../../../services/api';
import types from './counterConstant';
import counterAction from './counterAction';

const x = 0;

function* watchIncrement() {
  while (x === 0) {
    const { payload } = yield take(types.DELAY_INCREMENT);
    yield delay(3000);
    yield put(counterAction.increment(payload));
  }
}

function* watchCallApi() {
  while (x === 0) {
    yield take(types.CALL_API);
    const data = yield call(testApi);
    yield put(counterAction.increment(data.length));
  }
}

export default [
  fork(watchIncrement),
  fork(watchCallApi),
];
