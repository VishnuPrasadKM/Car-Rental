import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { carsReducer } from "./reducers/carsReducer";
import { bookingsReducer } from "./reducers/bookingsReducer";

const composeEnhancers = composeWithDevTools({});

const rootReducers = combineReducers({
  carsReducer,
  bookingsReducer,
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
