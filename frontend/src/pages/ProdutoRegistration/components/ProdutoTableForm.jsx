import PropTypes from 'prop-types';

export default function ProdutoTableForm({
  produto,
  onProdutoChange,
  onProdutoSubmit,
  onCancel,
  skuDisabled,
}) {
  const handleInputChange = ({ target: { name, value } }) => {
    onProdutoChange({ ...produto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProdutoSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
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
