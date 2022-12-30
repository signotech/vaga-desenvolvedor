import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';

import Alert from '../../../components/Alert';
import ProdutoTableForm from './ProdutoTableForm';
import ProdutoTableHeader from './ProdutoTableHeader';
import ProdutoTableRow from './ProdutoTableRow';
import { API_HOST, API_PORT } from '../../../config/environment';

export default function ProdutoTable({
  produtos,
  onProdutosChange,
  filter,
  sort,
  onSortChange,
  itemsPerPage,
  pageNumber,
}) {
  const [produtoInput, setProdutoInput] = useState({
    skuProduto: '',
    tituloProduto: '',
    preco: '',
    estoque: '',
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

  const getAllProdutos = async () => {
    let url = `http://${API_HOST}:${API_PORT}/produtos?${filter.field}=${filter.text}&ordenarPor=${sort.field}&ordem=${sort.order}&porPagina=${itemsPerPage}&pagina=${pageNumber}`;
    if (filter.field === 'codigoPedido') {
      url = `http://${API_HOST}:${API_PORT}/pedidos/${filter.text}/produtos`;
    }
    const response = await fetch(url);
    if (response.status === 200) {
      const fetchedProdutos = await response.json();
      onProdutosChange(fetchedProdutos);
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao requisitar os produtos!',
      });
    }
  };

  const createProduto = async () => {
    const response = await fetch(`http://${API_HOST}:${API_PORT}/produtos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skuProduto: produtoInput.skuProduto,
        tituloProduto: produtoInput.tituloProduto,
        preco: Number(produtoInput.preco),
        estoque: Number(produtoInput.estoque),
      }),
    });
    if (response.status === 201) {
      const createdProduto = await response.json();
      onProdutosChange(produtos.concat(createdProduto));
      setOperationAlert({
        isError: false,
        hasMessage: true,
        message: 'O produto foi criado com sucesso!',
      });
    } else if (response.status === 409) {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'O SKU informado já existe!',
      });
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao criar o produto!',
      });
    }
    setIsCreating(false);
  };

  const updateProduto = async () => {
    const response = await fetch(`http://${API_HOST}:${API_PORT}/produtos/${produtoInput.skuProduto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tituloProduto: produtoInput.tituloProduto,
        preco: Number(produtoInput.preco),
        estoque: Number(produtoInput.estoque),
      }),
    });
    if (response.status === 200) {
      const updatedProduto = await response.json();
      onProdutosChange(produtos.map((produto) => (
        produto.skuProduto === updatedProduto.skuProduto ? updatedProduto : produto
      )));
      setOperationAlert({
        isError: false,
        hasMessage: true,
        message: 'Produto atualizado com sucesso!',
      });
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao atualizar o produto!',
      });
    }
    setIsUpdating(false);
  };

  const deleteProdutoBySku = async (sku) => {
    const response = await fetch(`http://${API_HOST}:${API_PORT}/produtos/${sku}`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      onProdutosChange(produtos.filter((produto) => produto.skuProduto !== sku));
      setOperationAlert({
        isError: false,
        hasMessage: true,
        message: 'Produto excluído com sucesso!',
      });
    } else {
      setOperationAlert({
        isError: true,
        hasMessage: true,
        message: 'Ocorreu um erro ao excluír o produto',
      });
    }
  };

  const deleteAllProdutos = async () => {
    const response = await fetch(`http://${API_HOST}:${API_PORT}/produtos`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      onProdutosChange([]);
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
    setProdutoInput({
      skuProduto: '',
      tituloProduto: '',
      estoque: '',
      preco: '',
    });
  };

  const startUpdate = (produto) => {
    if (isCreating) {
      setIsCreating(false);
    }
    setIsUpdating(true);
    setProdutoInput(produto);
  };

  const resetOperationAlert = () => {
    setOperationAlert({ isError: false, hasMessage: false, messsage: '' });
  };

  useEffect(() => {
    getAllProdutos();
  }, [filter, sort, itemsPerPage, pageNumber]);

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      resetOperationAlert();
    }, 5000);

    return () => clearTimeout(timeout.current);
  }, [operationAlert]);

  produtos.forEach((produto) => {
    rows.push(
      <ProdutoTableRow
        key={produto.skuProduto}
        produto={produto}
        onUpdateButtonClick={() => startUpdate(produto)}
        onDeleteButtonClick={() => deleteProdutoBySku(produto.skuProduto)}
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
            onClick={deleteAllProdutos}
          >
            Deletar todos
          </Button>
        </Col>
      </Row>
      {isCreating && (
        <ProdutoTableForm
          title="Criar produto"
          produto={produtoInput}
          onProdutoChange={setProdutoInput}
          onProdutoSubmit={createProduto}
          onCancel={() => setIsCreating(false)}
        />
      )}
      {isUpdating && (
        <ProdutoTableForm
          title="Atualizar produto"
          produto={produtoInput}
          onProdutoChange={setProdutoInput}
          onProdutoSubmit={updateProduto}
          onCancel={() => setIsUpdating(false)}
          skuDisabled
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
          <ProdutoTableHeader sort={sort} onSortChange={onSortChange} />
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </div>
  );
}

ProdutoTable.propTypes = {
  produtos: PropTypes.arrayOf(
    PropTypes.shape({
      skuProduto: PropTypes.string,
      tituloProduto: PropTypes.string,
      preco: PropTypes.number,
      estoque: PropTypes.number,
    }),
  ).isRequired,
  onProdutosChange: PropTypes.func.isRequired,
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
