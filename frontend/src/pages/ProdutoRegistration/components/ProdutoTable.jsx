import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ProdutoTableForm from './ProdutoTableForm';
import ProdutoTableHeader from './ProdutoTableHeader';
import ProdutoTableRow from './ProdutoTableRow';

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
  const rows = [];

  const getAllProdutos = async () => {
    const url = `http://localhost:3001/produtos?${filter.field}=${filter.text}&ordenarPor=${sort.field}&ordem=${sort.order}&porPagina=${itemsPerPage}&pagina=${pageNumber}`;
    const response = await fetch(url);
    const fetchedProdutos = await response.json();
    onProdutosChange(fetchedProdutos);
  };

  const createProduto = async () => {
    const response = await fetch('http://localhost:3001/produtos', {
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
    }
    setIsCreating(false);
  };

  const updateProduto = async () => {
    const response = await fetch(`http://localhost:3001/produtos/${produtoInput.skuProduto}`, {
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
    }
    setIsUpdating(false);
  };

  const deleteProdutoBySku = async (sku) => {
    await fetch(`http://localhost:3001/produtos/${sku}`, { method: 'DELETE' });
    onProdutosChange(produtos.filter((produto) => produto.skuProduto !== sku));
  };

  const deleteAllProdutos = async () => {
    await fetch('http://localhost:3001/produtos', { method: 'DELETE' });
    onProdutosChange([]);
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

  useEffect(() => {
    getAllProdutos();
  }, [filter, sort, itemsPerPage, pageNumber]);

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
      <button type="button" onClick={deleteAllProdutos}>Limpar</button>
      <button type="button" onClick={startCreation}>Adicionar</button>
      {isCreating && (
        <ProdutoTableForm
          produto={produtoInput}
          onProdutoChange={setProdutoInput}
          onProdutoSubmit={createProduto}
          onCancel={() => setIsCreating(false)}
        />
      )}
      {isUpdating && (
        <ProdutoTableForm
          produto={produtoInput}
          onProdutoChange={setProdutoInput}
          onProdutoSubmit={updateProduto}
          onCancel={() => setIsUpdating(false)}
          skuDisabled
        />
      )}
      <table>
        <thead>
          <ProdutoTableHeader sort={sort} onSortChange={onSortChange} />
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
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
