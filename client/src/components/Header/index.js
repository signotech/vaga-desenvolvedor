import React from 'react';
import logo from '../../../assets/logo.svg';

import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="logo" width="200px" />
      <ul>
        <li><a href="/">pedidos</a></li>
        <li><a href="/">produtos</a></li>
        <li><a href="/">clientes</a></li>
      </ul>
    </Container>
  );
}
