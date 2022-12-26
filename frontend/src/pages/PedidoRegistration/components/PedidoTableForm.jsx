import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function PedidoTableForm({
  pedido,
  onPedidoChange,
  onPedidoSubmit,
  onCancel,
  cpfDisabled,
  skuDisabled,
}) {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

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
    onPedidoSubmit();
  };

  const getAllClientes = async () => {
    const url = 'http://localhost:3001/clientes';
    const response = await fetch(url);
    const fetchedClientes = await response.json();
    setClientes(fetchedClientes);
  };

  const getAllProdutos = async () => {
    const url = 'http://localhost:3001/produtos';
    const response = await fetch(url);
    const fetchedProdutos = await response.json();
    setProdutos(fetchedProdutos);
  };

  useEffect(() => {
    getAllClientes();
    getAllProdutos();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="cpfCliente">
        CPF do cliente
        <select
          name="cpfCliente"
          id="cpfCliente"
          value={pedido.cpfCliente}
          onChange={handleInputChange}
          disabled={cpfDisabled}
        >
          {clientes.map(({ cpfCliente }) => (
            <option key={cpfCliente} value={cpfCliente}>{cpfCliente}</option>
          ))}
        </select>
      </label>
      <label htmlFor="skuProdutos">
        SKU dos produtos
        <select
          multiple
          name="skuProdutos"
          id="skuProdutos"
          value={pedido.skuProdutos}
          onChange={handleInputChange}
          disabled={skuDisabled}
        >
          {produtos.map(({ skuProduto }) => (
            <option key={skuProduto} value={skuProduto}>{skuProduto}</option>
          ))}
        </select>
      </label>
      <label htmlFor="status">
        Status
        <select
          name="status"
          id="status"
          value={pedido.status}
          onChange={handleInputChange}
        >
          <option value="em aberto">Em aberto</option>
          <option value="pago">Pago</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </label>
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

PedidoTableForm.propTypes = {
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
