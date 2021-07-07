import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];
const initialState = {};

const composeEnhancers =
  typeof window === "object" && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const composingMiddlewareAndDevTools = composeEnhancers(
  applyMiddleware(...middleware)
);

const store = createStore(
  rootReducer,
  initialState,
  composingMiddlewareAndDevTools
);

export default store;
