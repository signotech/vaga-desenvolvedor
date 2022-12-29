import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function ClienteTableForm({
  title,
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
    <Modal show onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nomeCliente">
              Nome
            </Form.Label>
            <Form.Control
              type="text"
              id="nomeCliente"
              name="nomeCliente"
              value={cliente.nomeCliente}
              onChange={handleInputChange}
              isInvalid={!nomeValidation.isValid}
            />
            <Form.Control.Feedback type="invalid">
              {nomeValidation.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="emailCliente">
              Email
            </Form.Label>
            <Form.Control
              type="text"
              id="emailCliente"
              name="emailCliente"
              value={cliente.emailCliente}
              onChange={handleInputChange}
              isInvalid={!emailValidation.isValid}
            />
            <Form.Control.Feedback type="invalid">
              {emailValidation.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="cpfCliente">
              CPF
            </Form.Label>
            <Form.Control
              type="text"
              id="cpfCliente"
              name="cpfCliente"
              value={cliente.cpfCliente}
              onChange={handleInputChange}
              disabled={cpfDisabled}
              isInvalid={!cpfValidation.isValid}
            />
            <Form.Control.Feedback type="invalid">
              {cpfValidation.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" type="button" onClick={onCancel}>Cancelar</Button>
        <Button variant="success" type="button" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}

ClienteTableForm.propTypes = {
  title: PropTypes.string.isRequired,
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
