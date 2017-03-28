/**
 *  Point of contact for api modules
 *
 *  ie: import { getUserData } from 'webApi';
 *
 */
/**/
import 'isomorphic-fetch';

import client from './callApi';

/* api modules */

// todoList
export const getTodoList = () => client.get('todoList/list');
export const addTodo = todo => client.post('todoList/create', { data: { todo } });
export const editTodo = (todo, todoId) => client.put('todoList/update', { data: { todo, todoId } });
export const deleteTodo = todoId => client.delete('todoList/delete', { data: { todoId } });

export const webApi = {
  getTodoList,
  addTodo,
  editTodo,
  deleteTodo,
};
