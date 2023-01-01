import { legacy_createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from"redux-persist";

import rootReducer from './root-reducer';

const middleWares = [];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}

export const store = legacy_createStore(rootReducer, applyMiddleware(...middleWares));
export const persistor = persistStore(store);