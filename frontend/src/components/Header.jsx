import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
  return (
    <header>
      <h1>Cadastro de Pedidos de Compra</h1>
      <Navbar>
        <Nav className="gap-4">
          <LinkContainer to="/clientes">
            <Nav.Link>Clientes</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/produtos">
            <Nav.Link>Produtos</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/pedidos">
            <Nav.Link>Pedidos</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
    </header>
  );
}
