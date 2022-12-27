import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Alert from '../../../components/Alert';
import PedidoTableForm from './PedidoTableForm';
import PedidoTableHeader from './PedidoTableHeader';
import PedidoTableRow from './PedidoTableRow';

export default function PedidoTable({
  pedidos,
  onPedidosChange,
  filter,
  sort,
  onSortChange,
  itemsPerPage,
  pageNumber,
}) {
  const [pedidoInput, setPedidoInput] = useState({
    codigoPedido: 0,
    status: 'em aberto',
    dataPedido: '',
    cpfCliente: '',
    skuProdutos: [],
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [operationAlert, setOperationAlert] = useState({
    isError: false,
    hasMessage: false,
    message: '',
  });
  const timeout = useRef(0);
  const rows = [];

  const getAllPedidos = async () => {
    const url = `http://localhost:3001/pedidos?${filter.field}=${filter.text}&ordenarPor=${sort.field}&ordem=${sort.order}&porPagina=${itemsPerPage}&pagina=${pageNumber}`;
    const response = await fetch(url);
    if (response.status === 200) {
      const fetchedPedidos = await response.json();
      onPedidosChange(fetchedPedidos);
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao requisitar os pedidos!',
      });
    }
  };

  const createPedido = async () => {
    const response = await fetch('http://localhost:3001/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: pedidoInput.status,
        cpfCliente: pedidoInput.cpfCliente,
        skuProdutos: pedidoInput.skuProdutos,
      }),
    });
    if (response.status === 201) {
      const createdPedido = await response.json();
      onPedidosChange(pedidos.concat(createdPedido));
      setOperationAlert({
        isError: false,
        hasMessage: true,
        message: 'O pedido foi criado com sucesso!',
      });
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao criar o pedido!',
      });
    }
    setIsCreating(false);
  };

  const updatePedido = async () => {
    const response = await fetch(`http://localhost:3001/pedidos/${pedidoInput.codigoPedido}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: pedidoInput.status,
      }),
    });
    if (response.status === 200) {
      const updatedPedido = await response.json();
      onPedidosChange(pedidos.map((pedido) => (
        pedido.codigoPedido === updatedPedido.codigoPedido ? updatedPedido : pedido
      )));
      setOperationAlert({
        isError: false,
        hasMessage: true,
        message: 'Pedido atualizado com sucesso!',
      });
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao atualizar o pedido!',
      });
    }
    setIsUpdating(false);
  };

  const deletePedidoByCodigo = async (codigo) => {
    const response = await fetch(`http://localhost:3001/pedidos/${codigo}`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      onPedidosChange(pedidos.filter((pedido) => pedido.codigoPedido !== codigo));
      setOperationAlert({
        isError: false,
        hasMessage: true,
        message: 'Pedido excluído com sucesso!',
      });
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao excluír o pedido',
      });
    }
  };

  const deleteAllPedidos = async () => {
    const response = await fetch('http://localhost:3001/pedidos', {
      method: 'DELETE',
    });
    if (response.status === 204) {
      onPedidosChange([]);
      setOperationAlert({
        isError: false,
        hasMessage: true,
        message: 'Tabela limpa com sucesso!',
      });
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao limpar a tabela',
      });
    }
  };

  const startCreation = () => {
    if (isUpdating) {
      setIsUpdating(false);
    }
    setIsCreating(true);
    setPedidoInput({
      codigoPedido: 0,
      status: 'em aberto',
      dataPedido: '',
      cpfCliente: '',
      skuProdutos: [],
    });
  };

  const startUpdate = (pedido) => {
    if (isCreating) {
      setIsCreating(false);
    }
    setIsUpdating(true);
    setPedidoInput(pedido);
  };

  useEffect(() => {
    getAllPedidos();
  }, [filter, sort, itemsPerPage, pageNumber]);

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setOperationAlert({ isError: false, hasMessage: false, messsage: '' });
    }, 3000);

    return () => clearTimeout(timeout.current);
  }, [operationAlert]);

  pedidos.forEach((pedido) => {
    rows.push(
      <PedidoTableRow
        key={pedido.codigoPedido}
        pedido={pedido}
        onUpdateButtonClick={() => startUpdate(pedido)}
        onDeleteButtonClick={() => deletePedidoByCodigo(pedido.codigoPedido)}
      />,
    );
  });

  return (
    <div>
      <button type="button" onClick={deleteAllPedidos}>Limpar</button>
      <button type="button" onClick={startCreation}>Adicionar</button>
      {isCreating && (
        <PedidoTableForm
          pedido={pedidoInput}
          onPedidoChange={setPedidoInput}
          onPedidoSubmit={createPedido}
          onCancel={() => setIsCreating(false)}
        />
      )}
      {isUpdating && (
        <PedidoTableForm
          pedido={pedidoInput}
          onPedidoChange={setPedidoInput}
          onPedidoSubmit={updatePedido}
          onCancel={() => setIsUpdating(false)}
          cpfDisabled
          skuDisabled
        />
      )}
      {operationAlert.hasMessage && (
        <Alert isError={operationAlert.isError} message={operationAlert.message} />
      )}
      <table>
        <thead>
          <PedidoTableHeader sort={sort} onSortChange={onSortChange} />
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

PedidoTable.propTypes = {
  pedidos: PropTypes.arrayOf(
    PropTypes.shape({
      codigoPedido: PropTypes.number,
      status: PropTypes.string,
      dataPedido: PropTypes.string,
    }),
  ).isRequired,
  onPedidosChange: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    field: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  sort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  onSortChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
};
