import { useState } from 'react';
import PropTypes from 'prop-types';

export default function FilterBar({ onFilterSubmit }) {
  const [filterText, setFilterText] = useState('');
  const [filterField, setFilterField] = useState('tituloProduto');

  const submitFilter = (e) => {
    e.preventDefault();
    onFilterSubmit({
      text: filterText,
      field: filterField,
    });
  };

  return (
    <form onSubmit={submitFilter}>
      <input
        type="search"
        name="filterText"
        id="filterText"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <select
        name="filterField"
        id="filterField"
        value={filterField}
        onChange={(e) => setFilterField(e.target.value)}
      >
        <option value="skuProduto">SKU</option>
        <option value="tituloProduto">Título</option>
        <option value="preco">Preço</option>
        <option value="estoque">Estoque</option>
        <option value="codigoPedido">Código do pedido</option>
      </select>
      <button type="submit">Filtrar</button>
    </form>
  );
}

FilterBar.propTypes = {
  onFilterSubmit: PropTypes.func.isRequired,
};
