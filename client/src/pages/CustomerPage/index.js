import React from 'react';

import Container from '../../components/Container';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Card from '../../components/Card';

export default function CustomerPage() {
  return (
    <Container>
      <h1>Clientes</h1>
      <header>
        <h2>3 clientes</h2>
        <Button>
          Novo Cliente
        </Button>
      </header>
      <input type="text" placeholder="pesquisar clientes" />
      <div className="orderBy">
        <Select>
          <option value="cpf">CPF</option>
          <option value="Nome">Nome</option>
        </Select>
      </div>

      <Card
        title="José da Silva"
        subtitleDescription="e-mail:"
        subtitle="jose@mail.com"
        smallDescription="CPF:"
        small="123.456.789-11"
      />
      <Card
        title="Marcio da Silva"
        subtitleDescription="e-mail:"
        subtitle="marcio@mail.com"
        smallDescription="CPF:"
        small="123.456.789-10"
      />

    </Container>

  );
}
