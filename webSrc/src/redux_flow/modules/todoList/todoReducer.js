import { handleActions } from 'redux-actions';
import types from './todoConstant';

const initialState = [];

export default handleActions({
  [types.ADD_TODO]: (state, { payload }) => ([
    ...state,
    { id: payload.id, text: payload.text, isEdit: payload.isEdit, editText: payload.editText, }
  ]),

  [types.EDIT_TODO]: (state, { payload }) => ([
    ...state.slice(0, payload),
    {
      ...state[payload],
      text: state[payload].editText,
      isEdit: false,
    },
    ...state.slice(payload + 1),
  ]),
  [types.CHANGE_EDIT_STATUS]: (state, { payload }) => ([
    ...state.slice(0, payload),
    {
      ...state[payload],
      isEdit: !state[payload].isEdit,
      editText: state[payload].text,
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
    ...state.filter(todo => todo.id !== payload)
  ]),

  [types.QUERY_TODO]: (state, { payload }) => ([
    ...state.filter(todo => todo.text.indexOf(payload) !== -1)
  ]),
}, initialState);
