import { fork, take, call, put } from 'redux-saga/effects';

import { webApi } from '../../../services/api';
import todoAction from './todoAction';
import types from './todoConstant';

const x = 0;

function* watchGetTodoList() {
  while (x === 0) {
    yield take(types.GET_TODO);
    const data = yield call(webApi.getTodoList);
    yield put(todoAction.getTodoSuccess(data.error ? [] : data));
  }
}

export default [
  fork(watchGetTodoList),
];
