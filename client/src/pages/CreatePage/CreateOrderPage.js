import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import Input from '../../components/Input';
import FormOrder from '../../components/FormOrder';
import Modal from '../../components/Modal';

export default function CreateOrderPage() {
  return (
    <Container>
      <h1>Pedidos</h1>
      <div className="header">
        <Link to="orders">
          {'< Voltar'}
        </Link>
        <h2>Novo pedido #50</h2>
      </div>
      <FormOrder />
    </Container>
  );
}
