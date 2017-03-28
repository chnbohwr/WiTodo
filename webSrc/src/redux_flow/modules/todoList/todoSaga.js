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
    const todo = yield take(types.ADD_TODO);
    const data = yield call(webApi.addTodo, todo.payload);
    yield put(todoAction.getTodo());
  }
}

function* watchDeleteTodo() {
  while (x === 0) {
    const todo = yield take(types.REMOVE_TODO);
    const data = yield call(webApi.deleteTodo, todo.payload);
    yield put(todoAction.getTodo());
  }
}

export default [
  fork(watchGetTodoList),
  fork(watchAddTodo),
  fork(watchDeleteTodo),
];
