import PropTypes from 'prop-types';

export default function PedidoTableRow({
  pedido,
  onUpdateButtonClick,
  onDeleteButtonClick,
}) {
  return (
    <tr>
      <td>{pedido.codigoPedido}</td>
      <td>{pedido.status}</td>
      <td>{pedido.dataPedido.replace(/T|Z/g, ' ')}</td>
      <td>
        <button type="button" onClick={onUpdateButtonClick}>Atualizar</button>
        <button type="button" onClick={onDeleteButtonClick}>Deletar</button>
      </td>
    </tr>
  );
}

PedidoTableRow.propTypes = {
  pedido: PropTypes.shape({
    codigoPedido: PropTypes.number,
    status: PropTypes.string,
    dataPedido: PropTypes.string,
  }).isRequired,
  onUpdateButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};
