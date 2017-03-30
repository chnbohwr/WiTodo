import { createAction } from 'redux-actions';
import types from './LoginConstant';

export default {
  loginRequest: createAction(types.LOGIN_REQUEST),
  loginSuccess: createAction(types.LOGIN_SUCCESS),
  loginFailure: createAction(types.LOGIN_FAILURE),
};
