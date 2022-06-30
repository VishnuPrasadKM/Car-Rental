import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { carsReducer } from './reducers/carsReducer';
import { alertReducer } from './reducers/alertsReducer';

const composeEnhancers = composeWithDevTools({

});

const rootReducers = combineReducers({
  carsReducer,
  alertReducer
})

const store = createStore(
  rootReducers,
  composeEnhancers(
    applyMiddleware(thunk)

  )
);

export default store;