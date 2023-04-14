import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import Routes from '../../routes';

export default function Layout() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}
