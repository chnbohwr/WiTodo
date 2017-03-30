import { handleActions } from 'redux-actions';
import types from './LoginConstant';

const initialState = {
  error: '',
};

export default handleActions({
  [types.LOGIN_FAILURE]: (state, { payload }) => ({
    ...state,
    error: payload,
  })
}, initialState);
