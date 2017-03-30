import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducer';
import sagaManager from './sagaManager';

function reduxStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    routerMiddleware(hashHistory),
    sagaMiddleware,
  ];

  const enhancers = [applyMiddleware(...middleware)];
  const finalCreateStore = compose(...enhancers)(createStore);
  const store = finalCreateStore(reducer, initialState,
    window.devToolsExtension && window.devToolsExtension());

  sagaManager.startSagas(sagaMiddleware);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require('./reducer').default;  // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });

    module.hot.accept('./sagaManager', () => {
      sagaManager.cancelSagas(store);
      require('./sagaManager').default.startSagas(sagaMiddleware);
    });
  }

  store.runSaga = sagaMiddleware.run;
  return store;
}

export default reduxStore;
