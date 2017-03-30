import { fork, take, call, put, takeEvery } from 'redux-saga/effects';

import { webApi } from '../../../services/api';
import todoAction from './todoAction';
import types from './todoConstant';

function* getTodoList() {
  try {
    const data = yield call(webApi.getTodoList);
    yield put(todoAction.getTodoSuccess(data.error ? [] : data));
  } catch (err) {
    console.log(err);
  }
}

function* addTodo({ payload }) {
  yield call(webApi.addTodo, payload);
  yield fork(getTodoList);
}

function* editTodo({ payload }) {
  yield call(webApi.editTodo, payload);
  yield fork(getTodoList);
}

function* deleteTodo({ payload }) {
  debugger;
  yield call(webApi.deleteTodo, payload);
  yield fork(getTodoList);
}

function* watchGetTodoList() {
  yield takeEvery(types.GET_TODO, getTodoList);
}

function* watchAddTodo() {
  yield takeEvery(types.ADD_TODO, addTodo);
}

function* watchEditTodo() {
  yield takeEvery(types.EDIT_TODO, editTodo);
}

function* watchDeleteTodo() {
  yield takeEvery(types.REMOVE_TODO, deleteTodo);
}

export default [
  fork(watchGetTodoList),
  fork(watchAddTodo),
  fork(watchEditTodo),
  fork(watchDeleteTodo),
];
