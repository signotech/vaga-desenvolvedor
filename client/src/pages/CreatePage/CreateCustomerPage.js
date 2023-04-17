import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import FormCustomer from '../../components/FormCustomer';

export default function CreateCustomerPage() {
  return (
    <Container>
      <h1>Clientes</h1>
      <div className="header">
        <Link to="products">
          {'< Voltar'}
        </Link>
        <h2>
          Novo cliente
        </h2>
      </div>
      <FormCustomer />
    </Container>
  );
}
