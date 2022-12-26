import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <ul>
          <li>
            <Link to="/clientes">Clientes</Link>
          </li>
          <li>
            <Link to="/produtos">Produtos</Link>
          </li>
          <li>
            <Link to="/pedidos">Pedidos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
