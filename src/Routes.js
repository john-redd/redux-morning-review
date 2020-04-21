import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';

export default function () {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  );
}
