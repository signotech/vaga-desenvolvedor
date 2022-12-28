import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BsTrashFill, BsPencilFill } from 'react-icons/bs';

export default function ClienteTableRow({
  cliente,
  onUpdateButtonClick,
  onDeleteButtonClick,
}) {
  return (
    <tr>
      <td>{cliente.nomeCliente}</td>
      <td>{cliente.emailCliente}</td>
      <td>{cliente.cpfCliente}</td>
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

ClienteTableRow.propTypes = {
  cliente: PropTypes.shape({
    nomeCliente: PropTypes.string,
    emailCliente: PropTypes.string,
    cpfCliente: PropTypes.string,
  }).isRequired,
  onUpdateButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};
