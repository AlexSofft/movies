import { createStore, compose } from 'redux';

import reducer from './reducer';

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  ),
);

export default store;