import { fork, cancel, take } from 'redux-saga/effects';
import counterSaga from './modules/counter/counterSaga';
import todoSaga from './modules/todoList/todoSaga';
import authSaga from './modules/auth/authSaga';

export function* sagas() {
  yield [
    ...counterSaga,
    ...todoSaga,
    ...authSaga,
  ];
}

const rootSaga = [sagas];
const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga) {
  if (process.env.NODE_ENV === 'development') {
    return function* main() {
      const sagaTask = yield fork(saga);
      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  }
  return saga;
}

export default {
  startSagas(sagaMiddleware) {
    rootSaga.map(createAbortableSaga).forEach(saga => sagaMiddleware.run(saga));
  },

  cancelSagas(store) {
    store.dispatch({ type: CANCEL_SAGAS_HMR });
  }
};
