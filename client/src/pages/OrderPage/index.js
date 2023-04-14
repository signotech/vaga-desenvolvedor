import React from 'react';

import Container from '../../components/Container';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Card from '../../components/Card';

export default function OrderPage() {
  return (
    <Container>
      <h1>Pedidos</h1>
      <header>
        <h2>3 pedidos</h2>
        <Button>
          Novo Pedido
        </Button>
      </header>
      <input type="text" placeholder="pesquisar pedidos" />
      <div className="orderBy">
        <Select>
          <option value="Pedido">Pedido</option>
          <option value="Nome">Nome</option>
        </Select>
      </div>

      <Card
        title="Pedido nº50"
        subtitleDescription="Nome do cliente:"
        subtitle="José da Silva"
        smallDescription="Data do pedido:"
        small="11/04/2023"
      />
      <Card
        title="Pedido nº51"
        subtitleDescription="Nome do cliente:"
        subtitle="José da Silva"
        smallDescription="Data do pedido:"
        small="11/04/2023"
      />

    </Container>

  );
}
