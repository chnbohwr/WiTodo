import { createAction } from 'redux-actions';
import types from './menuConstant';

export default {
  updateActiveItems: createAction(types.UPDATE_ACTIVE_ITEMS),
};
