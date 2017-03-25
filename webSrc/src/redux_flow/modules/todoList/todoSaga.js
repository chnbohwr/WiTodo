import { fork, take, call, put } from 'redux-saga/effects';

import { webApi } from '../../../services/api';
import todoAction from './todoAction';
import types from './todoConstant';


function* watchGetTodoList() {
  while (true) {
    yield take(types.GET_TODO);
    const data = yield call(webApi.getTodoList);
    yield put(todoAction.getTodoSuccess(data));
  }
}

export default [
  fork(watchGetTodoList),
];
