import PropTypes from 'prop-types';

export default function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <a href="/clientes">Clientes</a>
        <a href="/produtos">Produtos</a>
        <a href="/pedidos">Pedidos</a>
      </nav>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
