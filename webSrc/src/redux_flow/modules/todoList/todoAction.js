import { createAction } from 'redux-actions';
import types from './todoConstant';

export default {
  addTodo: createAction(types.ADD_TODO),
  editTodo: createAction(types.EDIT_TODO),
  changeEditStatus: createAction(types.CHANGE_EDIT_STATUS),
  changeEditText: createAction(types.CHANGE_EDIT_TEXT),
  removeTodo: createAction(types.REMOVE_TODO),
  queryTodo: createAction(types.QUERY_TODO),
};
