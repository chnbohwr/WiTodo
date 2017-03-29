import { handleActions } from 'redux-actions';
import types from './LoginConstant';

const initialState = {
  isLogin: !!sessionStorage.getItem('isLogin') || false,
};

export default handleActions({
  [types.LOGIN_SUCCESS]: state => ({
    ...state,
    isLogin: true,
  })
}, initialState);
