import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";

import Reducers from "./reducers";

const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(thunk, logger)),
  window.STATE_FROM_SERVER
);

export default { store };
