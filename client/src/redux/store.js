import { createStore, combineReducers } from 'redux';
import session from './reducers/session';
import dashboard from './reducers/dashboard';
import images from './reducers/images';

const reducer = combineReducers({
  session,
  dashboard,
  images,
});

const store = createStore(reducer);

export default store;
