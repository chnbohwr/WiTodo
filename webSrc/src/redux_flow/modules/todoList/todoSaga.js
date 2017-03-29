import { fork, take, call, put } from 'redux-saga/effects';

import { webApi } from '../../../services/api';
import todoAction from './todoAction';
import types from './todoConstant';

const x = 0;

function* getTodoList() {
  try {
    const data = yield call(webApi.getTodoList);
    yield put(todoAction.getTodoSuccess(data.error ? [] : data));
  } catch (err) {
    console.log(err);
  }
}

function* watchGetTodoList() {
  while (x === 0) {
    yield take(types.GET_TODO);
    yield fork(getTodoList);
  }
}

function* watchAddTodo() {
  while (x === 0) {
    const { payload } = yield take(types.ADD_TODO);
    yield call(webApi.addTodo, payload);
    yield fork(getTodoList);
  }
}

function* watchEditTodo() {
  while (x === 0) {
    const { payload } = yield take(types.EDIT_TODO);
    yield call(webApi.editTodo, payload);
    yield fork(getTodoList);
  }
}

function* watchDeleteTodo() {
  while (x === 0) {
    const { payload } = yield take(types.REMOVE_TODO);
    yield call(webApi.deleteTodo, payload);
    yield fork(getTodoList);
  }
}

export default [
  fork(watchGetTodoList),
  fork(watchAddTodo),
  fork(watchEditTodo),
  fork(watchDeleteTodo),
];
