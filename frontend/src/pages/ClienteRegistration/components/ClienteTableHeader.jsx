import PropTypes from 'prop-types';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';

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
    <tr className="align-middle">
      <th style={{ cursor: 'pointer' }} onClick={() => changeSort('nomeCliente')}>
        Nome
        <BsArrowUp
          color={sort.field === 'nomeCliente' && sort.order === 'asc' ? 'black' : 'grey'}
        />
        <BsArrowDown
          color={sort.field === 'nomeCliente' && sort.order === 'desc' ? 'black' : 'grey'}
        />
      </th>
      <th style={{ cursor: 'pointer' }} onClick={() => changeSort('emailCliente')}>
        Email
        <BsArrowUp
          color={sort.field === 'emailCliente' && sort.order === 'asc' ? 'black' : 'grey'}
        />
        <BsArrowDown
          color={sort.field === 'emailCliente' && sort.order === 'desc' ? 'black' : 'grey'}
        />
      </th>
      <th style={{ cursor: 'pointer' }} onClick={() => changeSort('cpfCliente')}>
        CPF
        <BsArrowUp
          color={sort.field === 'cpfCliente' && sort.order === 'asc' ? 'black' : 'grey'}
        />
        <BsArrowDown
          color={sort.field === 'cpfCliente' && sort.order === 'desc' ? 'black' : 'grey'}
        />
      </th>
      <th>
        Ações
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
