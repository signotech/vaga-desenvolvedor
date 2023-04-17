import React, { useEffect, useState, useMemo } from 'react';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Select from '../../components/Select';
import Card from '../../components/Card';

export default function ProductPage() {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const filteredData = useMemo(() => data.filter((item) => (
    item.title_product.toLowerCase().includes(searchItem.toLowerCase()))), [data, searchItem]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch('http://localhost:3001/products');

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
      <h1>Produtos</h1>
      <header>
        <h2>
          {filteredData.length}
          {' '}
          produtos
        </h2>
        <Link
          to="/create-product"
        >
          <Button>
            Novo Produto
          </Button>
        </Link>
      </header>
      <input
        type="text"
        placeholder="pesquisar produtos"
        value={searchItem}
        onChange={(e) => handleChangeSearchTerm(e)}
      />
      <div className="orderBy">
        <Select>
          <option value="Pedido">Produto</option>
          <option value="Nome">Nome</option>
        </Select>
      </div>

      {
        filteredData.map((product) => (
          <Card
            title={product.title_product}
            subtitleDescription="Estoque:"
            subtitle={product.stock_product}
            smallDescription="Unidade:"
            small={product.sku_product}
          />
        ))
      }

    </Container>

  );
}
