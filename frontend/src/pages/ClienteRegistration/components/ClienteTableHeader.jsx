import PropTypes from 'prop-types';

export default function ClienteTableHeader({ sort, onSortChange }) {
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
        Nome
        <button type="button" onClick={() => changeSort('nomeCliente')}>
          Ordenar
        </button>
      </th>
      <th>
        Email
        <button type="button" onClick={() => changeSort('emailCliente')}>
          Ordenar
        </button>
      </th>
      <th>
        CPF
        <button type="button" onClick={() => changeSort('cpfCliente')}>
          Ordenar
        </button>
      </th>
    </tr>
  );
}

ClienteTableHeader.propTypes = {
  sort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  onSortChange: PropTypes.func.isRequired,
};
