import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { Router } from 'react-router-dom';
import { history } from './utils/history';
import { default as App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

declare global {
  interface Window {
    PRELOADED_STATE: object;
  }
}

const preloadedState = window.PRELOADED_STATE;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
