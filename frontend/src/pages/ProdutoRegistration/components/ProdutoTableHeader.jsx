import PropTypes from 'prop-types';

export default function ProdutoTableHeader({ sort, onSortChange }) {
  const changeSort = (field) => {
    const newSort = {
      field: sort.field,
      order: sort.field,
    };
    if (field !== sort.field) {
      newSort.field = field;
      newSort.order = 'asc';
    } else if (sort.order === 'asc') {
      newSort.order = 'desc';
    } else {
      newSort.order = 'asc';
    }
    onSortChange(newSort);
  };

  return (
    <tr>
      <th>
        SKU
        <button type="button" onClick={() => changeSort('skuProduto')}>
          Ordenar
        </button>
      </th>
      <th>
        Título
        <button type="button" onClick={() => changeSort('tituloProduto')}>
          Ordenar
        </button>
      </th>
      <th>
        Preço
        <button type="button" onClick={() => changeSort('preco')}>
          Ordenar
        </button>
      </th>
      <th>
        Estoque
        <button type="button" onClick={() => changeSort('estoque')}>
          Ordenar
        </button>
      </th>
    </tr>
  );
}

ProdutoTableHeader.propTypes = {
  sort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  onSortChange: PropTypes.func.isRequired,
};
