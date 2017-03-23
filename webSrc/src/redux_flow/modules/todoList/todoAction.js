import { createAction } from 'redux-actions';
import types from './todoConstant';

export default {
  addTodo: createAction(types.ADD_TODO),
  editTodo: createAction(types.EDIT_TODO),
  removeTodo: createAction(types.REMOVE_TODO),
  queryTodo: createAction(types.QUERY_TODO),
};
