import { handleActions } from 'redux-actions';
import types from './todoConstant';

const initialState = [];

export default handleActions({
  [types.ADD_TODO]: (state, { payload }) => ([
    ...state,
    { id: payload.id, text: payload.text }
  ]),
  [types.EDIT_TODO]: (state, { payload }) => ([
    ...state,
  ]),
  [types.REMOVE_TODO]: (state, { payload }) => ([
    ...state.filter(todo => todo.id !== payload)
  ]),
  [types.QUERY_TODO]: (state, { payload }) => ([
    ...payload.list
  ]),
}, initialState);
