import { combineReducers } from "redux";

import movies from "./movies/movies.reducer";

// unite reducers
const reducers = {
  movies,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
