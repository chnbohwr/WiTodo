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

export const webApi = {
  getTodoList
};
