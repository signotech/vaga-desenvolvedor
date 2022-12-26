import PropTypes from 'prop-types';

export default function ProdutoTableRow({
  produto,
  onUpdateButtonClick,
  onDeleteButtonClick,
}) {
  return (
    <tr>
      <td>{produto.skuProduto}</td>
      <td>{produto.tituloProduto}</td>
      <td>{produto.preco}</td>
      <td>{produto.estoque}</td>
      <td>
        <button type="button" onClick={onUpdateButtonClick}>Atualizar</button>
        <button type="button" onClick={onDeleteButtonClick}>Deletar</button>
      </td>
    </tr>
  );
}

ProdutoTableRow.propTypes = {
  produto: PropTypes.shape({
    skuProduto: PropTypes.string,
    tituloProduto: PropTypes.string,
    preco: PropTypes.number,
    estoque: PropTypes.number,
  }).isRequired,
  onUpdateButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};
