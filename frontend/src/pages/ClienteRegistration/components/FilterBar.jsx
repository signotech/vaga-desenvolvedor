import { useState } from 'react';
import PropTypes from 'prop-types';

export default function FilterBar({ onFilterSubmit }) {
  const [filterText, setFilterText] = useState('');
  const [filterField, setFilterField] = useState('nomeCliente');

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
        <option value="nomeCliente">Nome</option>
        <option value="emailCliente">Email</option>
        <option value="cpfCliente">CPF</option>
      </select>
      <button type="submit">Filtrar</button>
    </form>
  );
}

FilterBar.propTypes = {
  onFilterSubmit: PropTypes.func.isRequired,
};
