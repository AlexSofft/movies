import { createStore, compose } from "redux";

import reducer from "./reducer";

const initialState = {};

//unite reducers with init state and middlevars
const store = createStore(
  reducer,
  initialState,
  //подключения middlevars to redux
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ //ф-я от редаксдевтулс extencion
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
