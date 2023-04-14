import React, { useState } from 'react';
import logo from '../../../assets/logo.svg';

import { Container } from './styles';
import LinkAnchor from '../LinkAnchor';

export default function Header() {
  const [seleted, setSeleted] = useState(window.localStorage.getItem('page'));

  return (
    <Container>
      <a href="/"><img src={logo} alt="logo" width="200px" /></a>
      <ul>
        <li>
          <LinkAnchor
            pageSelected="orders"
            title="pedidos"
            seleted={seleted}
            setSeleted={setSeleted}
          />
        </li>
        <li>
          <LinkAnchor
            pageSelected="products"
            title="produtos"
            seleted={seleted}
            setSeleted={setSeleted}
          />
        </li>
        <li>
          <LinkAnchor
            pageSelected="customers"
            title="clientes"
            seleted={seleted}
            setSeleted={setSeleted}
          />
        </li>
      </ul>
    </Container>
  );
}
