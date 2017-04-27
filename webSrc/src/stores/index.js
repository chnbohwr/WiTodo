import { useStrict } from 'mobx';
import authStore from './AuthStore';
import todoStore from './TodoStore';

useStrict(true);

export default {
  authStore,
  todoStore
};
