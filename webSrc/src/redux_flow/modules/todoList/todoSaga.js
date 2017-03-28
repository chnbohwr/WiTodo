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

function* watchAddTodo() {
  while (x === 0) {
    const { payload } = yield take(types.ADD_TODO);
    const data = yield call(webApi.addTodo, payload);
    yield put(todoAction.getTodo());
  }
}

function* watchEditTodo() {
  while (x === 0) {
    const { payload } = yield take(types.EDIT_TODO);
    const data = yield call(webApi.editTodo, payload);
    yield put(todoAction.getTodo());
  }
}

function* watchDeleteTodo() {
  while (x === 0) {
    const { payload } = yield take(types.REMOVE_TODO);
    const data = yield call(webApi.deleteTodo, payload);
    yield put(todoAction.getTodo());
  }
}

export default [
  fork(watchGetTodoList),
  fork(watchAddTodo),
  fork(watchEditTodo),
  fork(watchDeleteTodo),
];
