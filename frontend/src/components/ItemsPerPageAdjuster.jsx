import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ItemsPerPageAdjuster({ onItemsPerPageSubmit }) {
  const [itemsPerPage, setItemsPerPage] = useState('20');

  const submitItemsPerPage = (e) => {
    e.preventDefault();
    onItemsPerPageSubmit(Number(itemsPerPage));
  };

  return (
    <form onSubmit={submitItemsPerPage}>
      <label htmlFor="itemsPerPage">
        Itens por página
        <input
          type="number"
          name="itemsPerPage"
          id="itemsPerPage"
          min={1}
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
        />
      </label>
      <button type="submit">Aplicar</button>
    </form>
  );
}

ItemsPerPageAdjuster.propTypes = {
  onItemsPerPageSubmit: PropTypes.func.isRequired,
};
