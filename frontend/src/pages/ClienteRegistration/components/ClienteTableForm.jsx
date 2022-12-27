import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ClienteTableForm({
  cliente,
  onClienteChange,
  onClienteSubmit,
  onCancel,
  cpfDisabled,
}) {
  const [nomeValidation, setNomeValidation] = useState({
    isValid: true,
    message: '',
  });
  const [emailValidation, setEmailValidation] = useState({
    isValid: true,
    message: '',
  });
  const [cpfValidation, setCpfValidation] = useState({
    isValid: true,
    message: '',
  });

  const handleInputChange = ({ target: { name, value } }) => {
    onClienteChange({ ...cliente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let shouldSubmit = true;

    setNomeValidation({ isValid: true, message: '' });
    setEmailValidation({ isValid: true, message: '' });
    setCpfValidation({ isValid: true, message: '' });

    if (!cliente.nomeCliente) {
      shouldSubmit = false;
      setNomeValidation({
        isValid: false,
        message: 'O nome deve conter pelo menos 1 caractere',
      });
    }

    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!cliente.emailCliente.match(emailFormat)) {
      shouldSubmit = false;
      setEmailValidation({
        isValid: false,
        message: 'Digite um email válido',
      });
    }

    const cpfFormat = /^\d{11}$/;
    if (!cliente.cpfCliente.match(cpfFormat)) {
      shouldSubmit = false;
      setCpfValidation({
        isValid: false,
        message: 'Digite um CPF válido (apenas dígitos)',
      });
    }

    if (shouldSubmit) {
      onClienteSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
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
        {!nomeValidation.isValid && (
          <div>{nomeValidation.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="emailCliente">
          Email
          <input
            type="text"
            id="emailCliente"
            name="emailCliente"
            value={cliente.emailCliente}
            onChange={handleInputChange}
          />
        </label>
        {!emailValidation.isValid && (
          <div>{emailValidation.message}</div>
        )}
      </div>
      <div>
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
        {!cpfValidation.isValid && (
          <div>{cpfValidation.message}</div>
        )}
      </div>
      <div>
        <button type="button" onClick={onCancel}>Cancelar</button>
        <button type="submit">Salvar</button>
      </div>
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
