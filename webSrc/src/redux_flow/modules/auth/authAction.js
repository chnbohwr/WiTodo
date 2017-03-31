import { createAction } from 'redux-actions';
import types from './authConstant';

export default {
  loginRequest: createAction(types.LOGIN_REQUEST),
  loginSuccess: createAction(types.LOGIN_SUCCESS),
  loginFailure: createAction(types.LOGIN_FAILURE),

  logoutRequest: createAction(types.LOGOUT_REQUEST),
};
