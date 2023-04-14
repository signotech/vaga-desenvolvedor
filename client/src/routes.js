import React from 'react';
import { Switch, Route } from 'react-router-dom';
import OrderPage from './pages/OrderPage';
import ProductPage from './pages/ProductPage';
import CustomerPage from './pages/CustomerPage';
import HomePage from './pages/HomePage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/orders" component={OrderPage} />
      <Route path="/products" component={ProductPage} />
      <Route path="/customers" component={CustomerPage} />
    </Switch>
  );
}
