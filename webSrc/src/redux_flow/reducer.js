import { combineReducers } from 'redux';
import { i18nReducer } from 'redux-react-i18n';
import { routerReducer } from 'react-router-redux';

import counter from './modules/counter/counterReducer';
import todoList from './modules/todoList/todoReducer';
import auth from './modules/auth/authReducer';

const rootReducers = combineReducers({
  i18n: i18nReducer,
  routing: routerReducer,
  counter,
  todoList,
  auth,
});

export default rootReducers;
