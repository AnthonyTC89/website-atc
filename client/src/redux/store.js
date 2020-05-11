import { createStore, combineReducers } from 'redux';
import session from './reducers/session';
import dashboard from './reducers/dashboard';
import data from './reducers/data';

const reducer = combineReducers({
  session,
  dashboard,
  data,
});

const store = createStore(reducer);

export default store;
