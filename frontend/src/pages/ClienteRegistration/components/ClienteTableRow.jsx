import PropTypes from 'prop-types';

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
        <button type="button" onClick={onUpdateButtonClick}>Atualizar</button>
        <button type="button" onClick={onDeleteButtonClick}>Deletar</button>
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
