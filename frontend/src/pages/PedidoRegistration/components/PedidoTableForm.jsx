import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { API_HOST, API_PORT } from '../../../config/environment';

export default function PedidoTableForm({
  title,
  pedido,
  onPedidoChange,
  onPedidoSubmit,
  onCancel,
  cpfDisabled,
  skuDisabled,
}) {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [cpfValidation, setCpfValidation] = useState({
    isValid: true,
    message: '',
  });
  const [skuValidation, setSkuValidation] = useState({
    isValid: true,
    message: '',
  });
  const [statusValidation, setStatusValidation] = useState({
    isValid: true,
    message: '',
  });

  const handleInputChange = ({ target: { name, value } }) => {
    if (name !== 'skuProdutos') {
      onPedidoChange({ ...pedido, [name]: value });
      return;
    }

    if (pedido.skuProdutos.includes(value)) {
      const filteredSkuProdutos = pedido.skuProdutos.filter((sku) => sku !== value);
      onPedidoChange({
        ...pedido,
        skuProdutos: filteredSkuProdutos,
      });
      return;
    }

    onPedidoChange({ ...pedido, skuProdutos: [...pedido.skuProdutos, value] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let shouldSubmit = true;

    setCpfValidation({ isValid: true, message: '' });
    setSkuValidation({ isValid: true, message: '' });
    setStatusValidation({ isValid: true, message: '' });

    if (!cpfDisabled && !pedido.cpfCliente) {
      shouldSubmit = false;
      setCpfValidation({
        isValid: false,
        message: 'Selecione um CPF',
      });
    }

    if (!skuDisabled && pedido.skuProdutos.length === 0) {
      shouldSubmit = false;
      setSkuValidation({
        isValid: false,
        message: 'Selecione um ou mais SKUs',
      });
    }

    if (!pedido.status) {
      shouldSubmit = false;
      setStatusValidation({
        isValid: false,
        message: 'Selecione um status',
      });
    }

    if (shouldSubmit) {
      onPedidoSubmit();
    }
  };

  const getAllClientes = async () => {
    const url = `http://${API_HOST}:${API_PORT}/clientes`;
    const response = await fetch(url);
    const fetchedClientes = await response.json();
    setClientes(fetchedClientes);
  };

  const getAllProdutos = async () => {
    const url = `http://${API_HOST}:${API_PORT}/produtos`;
    const response = await fetch(url);
    const fetchedProdutos = await response.json();
    setProdutos(fetchedProdutos);
  };

  useEffect(() => {
    getAllClientes();
    getAllProdutos();
  }, []);

  return (
    <Modal show onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="cpfCliente">
              CPF do cliente
            </Form.Label>
            <Form.Select
              name="cpfCliente"
              id="cpfCliente"
              value={pedido.cpfCliente}
              onChange={handleInputChange}
              disabled={cpfDisabled}
              isInvalid={!cpfValidation.isValid}
            >
              <option value="">Selecione...</option>
              {clientes.map(({ cpfCliente }) => (
                <option key={cpfCliente} value={cpfCliente}>{cpfCliente}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {cpfValidation.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="skuProdutos">
              SKU dos produtos
            </Form.Label>
            <Form.Select
              multiple
              name="skuProdutos"
              id="skuProdutos"
              value={pedido.skuProdutos}
              onChange={handleInputChange}
              disabled={skuDisabled}
              isInvalid={!skuValidation.isValid}
            >
              {produtos.map(({ skuProduto }) => (
                <option key={skuProduto} value={skuProduto}>{skuProduto}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {skuValidation.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="status">
              Status
            </Form.Label>
            <Form.Select
              name="status"
              id="status"
              value={pedido.status}
              onChange={handleInputChange}
              isInvalid={!statusValidation.isValid}
            >
              <option value="em aberto">Em aberto</option>
              <option value="pago">Pago</option>
              <option value="cancelado">Cancelado</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {statusValidation.message}
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

PedidoTableForm.propTypes = {
  title: PropTypes.string.isRequired,
  pedido: PropTypes.shape({
    codigoPedido: PropTypes.number,
    status: PropTypes.string,
    dataPedido: PropTypes.string,
    cpfCliente: PropTypes.string,
    skuProdutos: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onPedidoChange: PropTypes.func.isRequired,
  onPedidoSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  cpfDisabled: PropTypes.bool,
  skuDisabled: PropTypes.bool,
};

PedidoTableForm.defaultProps = {
  cpfDisabled: false,
  skuDisabled: false,
};
