import { useStrict } from 'mobx';
import authStore from './authStore';
import todoStore from './todoStore';

useStrict(true);

export default {
  authStore,
  todoStore
};
