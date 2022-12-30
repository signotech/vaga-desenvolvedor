import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';

import Alert from '../../../components/Alert';
import ClienteTableForm from './ClienteTableForm';
import ClienteTableHeader from './ClienteTableHeader';
import ClienteTableRow from './ClienteTableRow';
import { API_HOST, API_PORT } from '../../../config/environment';

export default function ClienteTable({
  clientes,
  onClientesChange,
  filter,
  sort,
  onSortChange,
  itemsPerPage,
  pageNumber,
}) {
  const [clienteInput, setClienteInput] = useState({
    nomeCliente: '',
    emailCliente: '',
    cpfCliente: '',
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

  const getAllClientes = async () => {
    const url = `http://${API_HOST}:${API_PORT}/clientes?${filter.field}=${filter.text}&ordenarPor=${sort.field}&ordem=${sort.order}&porPagina=${itemsPerPage}&pagina=${pageNumber}`;
    const response = await fetch(url);
    if (response.status === 200) {
      const fetchedClientes = await response.json();
      onClientesChange(fetchedClientes);
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao requisitar os clientes!',
      });
    }
  };

  const createCliente = async () => {
    const response = await fetch(`http://${API_HOST}:${API_PORT}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteInput),
    });
    if (response.status === 201) {
      const createdCliente = await response.json();
      onClientesChange(clientes.concat(createdCliente));
      setOperationAlert({
        isError: false,
        hasMessage: true,
        message: 'O cliente foi criado com sucesso!',
      });
    } else if (response.status === 409) {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'O CPF informado já existe!',
      });
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao criar o cliente!',
      });
    }
    setIsCreating(false);
  };

  const updateCliente = async () => {
    const response = await fetch(`http://${API_HOST}:${API_PORT}/clientes/${clienteInput.cpfCliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nomeCliente: clienteInput.nomeCliente,
        emailCliente: clienteInput.emailCliente,
      }),
    });
    if (response.status === 200) {
      const updatedCliente = await response.json();
      onClientesChange(clientes.map((cliente) => (
        cliente.cpfCliente === updatedCliente.cpfCliente ? updatedCliente : cliente
      )));
      setOperationAlert({
        isError: false,
        hasMessage: true,
        message: 'Cliente atualizado com sucesso!',
      });
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao atualizar o cliente!',
      });
    }
    setIsUpdating(false);
  };

  const deleteClienteByCpf = async (cpf) => {
    const response = await fetch(`http://${API_HOST}:${API_PORT}/clientes/${cpf}`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      onClientesChange(clientes.filter((cliente) => cliente.cpfCliente !== cpf));
      setOperationAlert({
        isError: false,
        hasMessage: true,
        message: 'Cliente excluído com sucesso!',
      });
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao excluír o cliente',
      });
    }
  };

  const deleteAllClientes = async () => {
    const response = await fetch(`http://${API_HOST}:${API_PORT}/clientes`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      onClientesChange([]);
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
    setClienteInput({
      nomeCliente: '',
      emailCliente: '',
      cpfCliente: '',
    });
  };

  const startUpdate = (cliente) => {
    if (isCreating) {
      setIsCreating(false);
    }
    setIsUpdating(true);
    setClienteInput(cliente);
  };

  const resetOperationAlert = () => {
    setOperationAlert({ isError: false, hasMessage: false, messsage: '' });
  };

  useEffect(() => {
    getAllClientes();
  }, [filter, sort, itemsPerPage, pageNumber]);

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      resetOperationAlert();
    }, 5000);

    return () => clearTimeout(timeout.current);
  }, [operationAlert]);

  clientes.forEach((cliente) => {
    rows.push(
      <ClienteTableRow
        key={cliente.cpfCliente}
        cliente={cliente}
        onUpdateButtonClick={() => startUpdate(cliente)}
        onDeleteButtonClick={() => deleteClienteByCpf(cliente.cpfCliente)}
      />,
    );
  });

  return (
    <div>
      <Row className="g-2 py-2">
        <Col xs="auto">
          <Button
            variant="success"
            type="button"
            onClick={startCreation}
          >
            Adicionar
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            variant="danger"
            type="button"
            onClick={deleteAllClientes}
          >
            Deletar todos
          </Button>
        </Col>
      </Row>
      {isCreating && (
        <ClienteTableForm
          title="Criar cliente"
          cliente={clienteInput}
          onClienteChange={setClienteInput}
          onClienteSubmit={createCliente}
          onCancel={() => setIsCreating(false)}
        />
      )}
      {isUpdating && (
        <ClienteTableForm
          title="Atualizar cliente"
          cliente={clienteInput}
          onClienteChange={setClienteInput}
          onClienteSubmit={updateCliente}
          onCancel={() => setIsUpdating(false)}
          cpfDisabled
        />
      )}
      {operationAlert.hasMessage && (
        <Alert
          isError={operationAlert.isError}
          message={operationAlert.message}
          onClose={resetOperationAlert}
        />
      )}
      <Table hover>
        <thead>
          <ClienteTableHeader sort={sort} onSortChange={onSortChange} />
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </div>
  );
}

ClienteTable.propTypes = {
  clientes: PropTypes.arrayOf(
    PropTypes.shape({
      cpfCliente: PropTypes.string,
      nomeCliente: PropTypes.string,
      emailCliente: PropTypes.string,
    }),
  ).isRequired,
  onClientesChange: PropTypes.func.isRequired,
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
