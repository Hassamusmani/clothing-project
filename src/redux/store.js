import { legacy_createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middleWares = [logger];

const store = legacy_createStore(rootReducer, applyMiddleware(...middleWares));

export default store;