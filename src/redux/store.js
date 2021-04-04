import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";

import Reducers from "./reducers";

function mockMiddleware() {
  return next => action => {
    console.info(action.type + '\n' + '--');
    return next(action);
  }
}

const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(thunk, MODE === 'development' ? logger : mockMiddleware))
);

export default {
  store,
};
