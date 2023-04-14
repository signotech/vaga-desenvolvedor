import React from 'react';

import Container from '../../components/Container';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Card from '../../components/Card';

export default function ProductPage() {
  return (
    <Container>
      <h1>Produtos</h1>
      <header>
        <h2>3 produtos</h2>
        <Button>
          Novo Produto
        </Button>
      </header>
      <input type="text" placeholder="pesquisar produtos" />
      <div className="orderBy">
        <Select>
          <option value="Pedido">Produto</option>
          <option value="Nome">Nome</option>
        </Select>
      </div>

      <Card
        title="Monitor 27°"
        subtitleDescription="Estoque:"
        subtitle="8"
        smallDescription="Unidade:"
        small="Unidade"
      />
      <Card
        title="Monitor 30°"
        subtitleDescription="Estoque:"
        subtitle="10"
        smallDescription="Unidade:"
        small="Unidade"
      />

    </Container>

  );
}
