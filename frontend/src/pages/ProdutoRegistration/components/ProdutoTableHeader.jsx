import PropTypes from 'prop-types';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';

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
    <tr className="align-middle">
      <th style={{ cursor: 'pointer' }} onClick={() => changeSort('skuProduto')}>
        SKU
        <BsArrowUp
          color={sort.field === 'skuProduto' && sort.order === 'asc' ? 'black' : 'grey'}
        />
        <BsArrowDown
          color={sort.field === 'skuProduto' && sort.order === 'desc' ? 'black' : 'grey'}
        />
      </th>
      <th style={{ cursor: 'pointer' }} onClick={() => changeSort('tituloProduto')}>
        Título
        <BsArrowUp
          color={sort.field === 'tituloProduto' && sort.order === 'asc' ? 'black' : 'grey'}
        />
        <BsArrowDown
          color={sort.field === 'tituloProduto' && sort.order === 'desc' ? 'black' : 'grey'}
        />
      </th>
      <th style={{ cursor: 'pointer' }} onClick={() => changeSort('preco')}>
        Preço
        <BsArrowUp
          color={sort.field === 'preco' && sort.order === 'asc' ? 'black' : 'grey'}
        />
        <BsArrowDown
          color={sort.field === 'preco' && sort.order === 'desc' ? 'black' : 'grey'}
        />
      </th>
      <th style={{ cursor: 'pointer' }} onClick={() => changeSort('estoque')}>
        Estoque
        <BsArrowUp
          color={sort.field === 'estoque' && sort.order === 'asc' ? 'black' : 'grey'}
        />
        <BsArrowDown
          color={sort.field === 'estoque' && sort.order === 'desc' ? 'black' : 'grey'}
        />
      </th>
      <th>
        Ações
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
