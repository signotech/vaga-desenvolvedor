import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ProdutoTableForm({
  produto,
  onProdutoChange,
  onProdutoSubmit,
  onCancel,
  skuDisabled,
}) {
  const [skuValidation, setSkuValidation] = useState({
    isValid: true,
    message: '',
  });
  const [tituloValidation, setTituloValidation] = useState({
    isValid: true,
    message: '',
  });
  const [precoValidation, setPrecoValidation] = useState({
    isValid: true,
    message: '',
  });
  const [estoqueValidation, setEstoqueValidation] = useState({
    isValid: true,
    message: '',
  });

  const handleInputChange = ({ target: { name, value } }) => {
    onProdutoChange({ ...produto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let shouldSubmit = true;

    setSkuValidation({ isValid: true, message: '' });
    setTituloValidation({ isValid: true, message: '' });
    setPrecoValidation({ isValid: true, message: '' });
    setEstoqueValidation({ isValid: true, message: '' });

    if (!produto.skuProduto) {
      shouldSubmit = false;
      setSkuValidation({
        isValid: false,
        message: 'O SKU deve conter pelo menos 1 caractere',
      });
    }

    if (!produto.tituloProduto) {
      shouldSubmit = false;
      setTituloValidation({
        isValid: false,
        message: 'O título do produto deve conter pelo menos 1 caractere',
      });
    }

    const preco = Number(produto.preco);
    if (preco <= 0) {
      shouldSubmit = false;
      setPrecoValidation({
        isValid: false,
        message: 'O preço deve ser maior que 0',
      });
    }

    const estoque = Number(produto.estoque);
    if (!produto.estoque || !Number.isInteger(estoque) || estoque < 0) {
      shouldSubmit = false;
      setEstoqueValidation({
        isValid: false,
        message: 'O estoque deve ser um número inteiro positivo',
      });
    }

    if (shouldSubmit) {
      onProdutoSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="skuProduto">
          SKU
          <input
            type="text"
            id="skuProduto"
            name="skuProduto"
            value={produto.skuProduto}
            onChange={handleInputChange}
            disabled={skuDisabled}
          />
        </label>
        {!skuValidation.isValid && (
          <div>{skuValidation.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="tituloProduto">
          Título
          <input
            type="text"
            id="tituloProduto"
            name="tituloProduto"
            value={produto.tituloProduto}
            onChange={handleInputChange}
          />
        </label>
        {!tituloValidation.isValid && (
          <div>{tituloValidation.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="preco">
          Preço
          <input
            type="number"
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={handleInputChange}
          />
        </label>
        {!precoValidation.isValid && (
          <div>{precoValidation.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="estoque">
          Estoque
          <input
            type="number"
            id="estoque"
            name="estoque"
            value={produto.estoque}
            onChange={handleInputChange}
          />
        </label>
        {!estoqueValidation.isValid && (
          <div>{estoqueValidation.message}</div>
        )}
      </div>
      <div>
        <button type="button" onClick={onCancel}>Cancelar</button>
        <button type="submit">Salvar</button>
      </div>
    </form>
  );
}

ProdutoTableForm.propTypes = {
  produto: PropTypes.shape({
    skuProduto: PropTypes.string,
    tituloProduto: PropTypes.string,
    preco: PropTypes.number,
    estoque: PropTypes.number,
  }).isRequired,
  onProdutoChange: PropTypes.func.isRequired,
  onProdutoSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  skuDisabled: PropTypes.bool,
};

ProdutoTableForm.defaultProps = {
  skuDisabled: false,
};
