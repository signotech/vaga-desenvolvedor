import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BsTrashFill, BsPencilFill } from 'react-icons/bs';

export default function ProdutoTableRow({
  produto,
  onUpdateButtonClick,
  onDeleteButtonClick,
}) {
  return (
    <tr className="align-middle">
      <td>{produto.skuProduto}</td>
      <td>{produto.tituloProduto}</td>
      <td>
        {produto.preco.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </td>
      <td>{produto.estoque}</td>
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
