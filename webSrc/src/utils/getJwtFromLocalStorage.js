import storage from '../storage';

export default () => storage.getItem('reduxPersist:auth').then(item => item.token).catch(() => null);
