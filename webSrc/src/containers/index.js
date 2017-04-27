/**
 *  Point of contact for container modules
 *
 *  ie: import { App } from 'containers';
 *
 */
/**/
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

import { Provider } from 'mobx-react';
// import package
import { Router, Route, hashHistory} from 'react-router';
import TodoList from './TodoList';
import Login from './Login';
import store from '../stores/';

// add router key to fix this issue
// https://github.com/reactjs/react-router-redux/issues/179#issuecomment-275576250
const Main = () => (
  <Provider {...store}>
    <Router key={Math.random()} history={hashHistory}>
      <Route path="/" component={Login} />
      <Route path="/todo" component={TodoList} />
    </Router>
  </Provider>
);

export default Main;
