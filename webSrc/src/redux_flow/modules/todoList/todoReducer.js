import { handleActions } from 'redux-actions';
import types from './todoConstant';

const initialState = [];

export default handleActions({
  [types.GET_TODO_SUCCESS]: (state, { payload }) => payload.map(todo => ({
    todoId: todo.todoId,
    todo: todo.todo,
    isEdit: false,
    editText: '',
  })),
  [types.ADD_TODO]: (state, { payload }) => ([
    ...state,
    { ...payload },
  ]),

  [types.EDIT_TODO]: (state, { payload }) => ([
    ...state.slice(0, payload),
    {
      ...state[payload],
      todo: state[payload].editText,
      isEdit: false,
    },
    ...state.slice(payload + 1),
  ]),
  [types.CHANGE_EDIT_STATUS]: (state, { payload }) => ([
    ...state.slice(0, payload),
    {
      ...state[payload],
      isEdit: !state[payload].isEdit,
      editText: state[payload].todo,
    },
    ...state.slice(payload + 1),
  ]),
  [types.CHANGE_EDIT_TEXT]: (state, { payload }) => ([
    ...state.slice(0, payload.index),
    {
      ...state[payload.index],
      editText: payload.text,
    },
    ...state.slice(payload.index + 1),
  ]),

  [types.REMOVE_TODO]: (state, { payload }) => ([
    ...state.filter(todo => todo.todoId !== payload)
  ]),
}, initialState);
