import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RequestPage from './pages/RequestPage';

export default function Routes() {
  return (
    <Switch>
      <Route path="/requests" component={<RequestPage />} />
    </Switch>
  );
}
