import React, { useEffect } from 'react';
import { BsFillBookmarksFill, BsFillClipboard2Fill, BsFillPersonCheckFill } from 'react-icons/bs';

import { Container, Card } from './styles';

export default function HomePage() {
  useEffect(() => {
    function handleClearLocalStorage() {
      window.localStorage.clear();
    }

    handleClearLocalStorage();
  }, []);

  return (
    <Container>
      <h1>Home</h1>
      <div className="options">
        <Card href="/orders">
          <span><BsFillBookmarksFill /></span>
          <p>Pedidos</p>
        </Card>
        <Card href="/products">
          <span><BsFillClipboard2Fill /></span>
          <p>Produtos</p>
        </Card>
        <Card href="/customers">
          <span><BsFillPersonCheckFill /></span>
          <p>Clientes</p>
        </Card>
      </div>
    </Container>
  );
}
