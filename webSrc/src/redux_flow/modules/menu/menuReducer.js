import { handleActions } from 'redux-actions';
import types, { menus } from './menuConstant';

const initialState = {
  items: menus,
  activeItems: [],
};

export default handleActions({
  [types.UPDATE_ACTIVE_ITEMS]: (state, { payload }) => ({
    ...state,
    activeItems: payload,
  }),
}, initialState);
