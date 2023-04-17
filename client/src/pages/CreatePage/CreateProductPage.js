import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import FormProduct from '../../components/FormProduct';

export default function CreateProductPage() {
  return (
    <Container>
      <h1>Produtos</h1>
      <div className="header">
        <Link to="products">
          {'< Voltar'}
        </Link>
        <h2>
          Novo produto
        </h2>
      </div>
      <FormProduct />
    </Container>
  );
}
