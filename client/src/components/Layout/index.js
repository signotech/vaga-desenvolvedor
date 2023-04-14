import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import Routes from '../../routes';

import { Container } from './styles';

export default function Layout() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes />
      </Container>
    </BrowserRouter>
  );
}
