import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Articles from './Articles';
import { isLoggedIn } from '../utils/auth';

const renderComponent = (Component, authRequired) => {
  return props => {
    if (authRequired) {
      if (!isLoggedIn()) {
        return <Redirect to="/login" />
      }
    }
    return <Component { ...props } />;
  };
};

class AppRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" render={renderComponent(Signup, false)} />
        <Route exact path="/profile" render={renderComponent(Profile, true)} />
        <Route component={Articles} />
      </Switch>
    );
  }
}

export default AppRoutes;