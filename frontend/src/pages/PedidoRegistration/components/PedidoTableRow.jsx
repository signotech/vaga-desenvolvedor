import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BsTrashFill, BsPencilFill } from 'react-icons/bs';

export default function PedidoTableRow({
  pedido,
  onUpdateButtonClick,
  onDeleteButtonClick,
}) {
  return (
    <tr className="align-middle">
      <td>{pedido.codigoPedido}</td>
      <td>{pedido.status}</td>
      <td>{pedido.dataPedido.replace(/T|Z/g, ' ')}</td>
      <td>
        <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
          <Button variant="white" type="button" onClick={onUpdateButtonClick}>
            <BsPencilFill color="orange" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip>Deletar</Tooltip>}>
          <Button variant="white" type="button" onClick={onDeleteButtonClick}>
            <BsTrashFill color="red" />
          </Button>
        </OverlayTrigger>
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
