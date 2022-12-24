import PropTypes from 'prop-types';

export default function ClienteTableForm({
  cliente,
  onClienteChange,
  onClienteSubmit,
  onCancel,
  cpfDisabled,
}) {
  const handleInputChange = ({ target: { name, value } }) => {
    onClienteChange({ ...cliente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClienteSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nomeCliente">
        Nome
        <input
          type="text"
          id="nomeCliente"
          name="nomeCliente"
          value={cliente.nomeCliente}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="emailCliente">
        Email
        <input
          type="email"
          id="emailCliente"
          name="emailCliente"
          value={cliente.emailCliente}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="cpfCliente">
        CPF
        <input
          type="text"
          id="cpfCliente"
          name="cpfCliente"
          value={cliente.cpfCliente}
          onChange={handleInputChange}
          disabled={cpfDisabled}
        />
      </label>
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

ClienteTableForm.propTypes = {
  cliente: PropTypes.shape({
    nomeCliente: PropTypes.string,
    emailCliente: PropTypes.string,
    cpfCliente: PropTypes.string,
  }).isRequired,
  onClienteChange: PropTypes.func.isRequired,
  onClienteSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  cpfDisabled: PropTypes.bool,
};

ClienteTableForm.defaultProps = {
  cpfDisabled: false,
};
