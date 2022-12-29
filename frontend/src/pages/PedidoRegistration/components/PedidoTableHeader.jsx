import PropTypes from 'prop-types';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';

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
    <tr className="align-middle">
      <th style={{ cursor: 'pointer' }} onClick={() => changeSort('codigoPedido')}>
        Código
        <BsArrowUp
          color={sort.field === 'codigoPedido' && sort.order === 'asc' ? 'black' : 'grey'}
        />
        <BsArrowDown
          color={sort.field === 'codigoPedido' && sort.order === 'desc' ? 'black' : 'grey'}
        />
      </th>
      <th style={{ cursor: 'pointer' }} onClick={() => changeSort('status')}>
        Status
        <BsArrowUp
          color={sort.field === 'status' && sort.order === 'asc' ? 'black' : 'grey'}
        />
        <BsArrowDown
          color={sort.field === 'status' && sort.order === 'desc' ? 'black' : 'grey'}
        />
      </th>
      <th style={{ cursor: 'pointer' }} onClick={() => changeSort('dataPedido')}>
        Data
        <BsArrowUp
          color={sort.field === 'dataPedido' && sort.order === 'asc' ? 'black' : 'grey'}
        />
        <BsArrowDown
          color={sort.field === 'dataPedido' && sort.order === 'desc' ? 'black' : 'grey'}
        />
      </th>
      <th>
        Ações
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
