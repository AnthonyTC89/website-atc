import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Signin from './SignIn';
import Home from './Home';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Signin} exact />
      </Switch>
      <Redirect to="/" />
    </BrowserRouter>
  </Provider>
);

export default App;
