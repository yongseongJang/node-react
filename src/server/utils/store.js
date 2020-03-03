const { createStore, applyMiddleware } = require('redux');
const createSagaMiddleware = require('redux-saga').default;
const rootReducer = require('../../public/reducers').default;
const { default: rootSaga, END } = require('../../public/sagas');

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);

  return store;
};

module.exports = configureStore;
