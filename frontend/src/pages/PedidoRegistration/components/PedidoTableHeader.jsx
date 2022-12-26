import PropTypes from 'prop-types';

export default function PedidoTableHeader({ sort, onSortChange }) {
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
        Código
        <button type="button" onClick={() => changeSort('codigoPedido')}>
          Ordenar
        </button>
      </th>
      <th>
        Status
        <button type="button" onClick={() => changeSort('status')}>
          Ordenar
        </button>
      </th>
      <th>
        Data
        <button type="button" onClick={() => changeSort('dataPedido')}>
          Ordenar
        </button>
      </th>
    </tr>
  );
}

PedidoTableHeader.propTypes = {
  sort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  onSortChange: PropTypes.func.isRequired,
};
