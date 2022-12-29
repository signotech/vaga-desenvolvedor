import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function ProdutoTableForm({
  title,
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
    <Modal show onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="skuProduto">
              SKU
            </Form.Label>
            <Form.Control
              type="text"
              id="skuProduto"
              name="skuProduto"
              value={produto.skuProduto}
              onChange={handleInputChange}
              disabled={skuDisabled}
              isInvalid={!skuValidation.isValid}
            />
            <Form.Control.Feedback type="invalid">
              {skuValidation.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="tituloProduto">
              Título
            </Form.Label>
            <Form.Control
              type="text"
              id="tituloProduto"
              name="tituloProduto"
              value={produto.tituloProduto}
              onChange={handleInputChange}
              isInvalid={!tituloValidation.isValid}
            />
            <Form.Control.Feedback type="invalid">
              {tituloValidation.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="preco">
              Preço
            </Form.Label>
            <Form.Control
              type="number"
              id="preco"
              name="preco"
              value={produto.preco}
              onChange={handleInputChange}
              isInvalid={!precoValidation.isValid}
            />
            <Form.Control.Feedback type="invalid">
              {precoValidation.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="estoque">
              Estoque
            </Form.Label>
            <Form.Control
              type="number"
              id="estoque"
              name="estoque"
              value={produto.estoque}
              onChange={handleInputChange}
              isInvalid={!estoqueValidation.isValid}
            />
            <Form.Control.Feedback type="invalid">
              {estoqueValidation.message}
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

ProdutoTableForm.propTypes = {
  title: PropTypes.string.isRequired,
  produto: PropTypes.shape({
    skuProduto: PropTypes.string,
    tituloProduto: PropTypes.string,
    preco: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    estoque: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  onProdutoChange: PropTypes.func.isRequired,
  onProdutoSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  skuDisabled: PropTypes.bool,
};

ProdutoTableForm.defaultProps = {
  skuDisabled: false,
};
