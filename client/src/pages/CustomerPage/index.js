import React, { useState, useEffect, useMemo } from 'react';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Card from '../../components/Card';

export default function CustomerPage() {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const filteredData = useMemo(() => data.filter((item) => (
    item.name.toLowerCase().includes(searchItem.toLowerCase()))), [data, searchItem]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch('http://localhost:3001/customers');

      const json = await response.json();

      setData(json);
    }

    getProducts();
  }, []);

  function handleChangeSearchTerm(e) {
    setSearchItem(e.target.value);
  }

  return (
    <Container>
      <h1>Clientes</h1>
      <header>
        <h2>
          {filteredData.length}
          {' '}
          clientes
        </h2>
        <Link to="/create-customer">

          <Button>
            Novo Cliente
          </Button>

        </Link>
      </header>
      <input
        type="text"
        placeholder="pesquisar clientes"
        value={searchItem}
        onChange={(e) => handleChangeSearchTerm(e)}
      />
      <div className="orderBy">
        <Select>
          <option value="cpf">CPF</option>
          <option value="Nome">Nome</option>
        </Select>
      </div>
      {
        filteredData.map((item) => (
          <Card
            title={item.name}
            subtitleDescription="e-mail:"
            subtitle={item.email}
            smallDescription="CPF:"
            small={item.user_cpf}
          />
        ))
      }

    </Container>

  );
}
