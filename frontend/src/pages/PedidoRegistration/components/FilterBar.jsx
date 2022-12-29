import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function FilterBar({ onFilterSubmit }) {
  const [filterText, setFilterText] = useState('');
  const [filterField, setFilterField] = useState('status');

  const submitFilter = (e) => {
    e.preventDefault();
    onFilterSubmit({
      text: filterText,
      field: filterField,
    });
  };

  return (
    <Form onSubmit={submitFilter}>
      <Row className="g-2 align-items-end py-2">
        <Col xs="auto">
          <Form.Label htmlFor="filterText" visuallyHidden>
            Filtro
          </Form.Label>
          <Form.Control
            type="text"
            name="filterText"
            id="filterText"
            placeholder="Filtro"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Form.Label htmlFor="filterField" visuallyHidden>
            Campo
          </Form.Label>
          <Form.Select
            name="filterField"
            id="filterField"
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
          >
            <option value="codigoPedido">Código</option>
            <option value="status">Status</option>
            <option value="dataPedido">Data</option>
            <option value="cpfCliente">CPF do cliente</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Button type="submit">Filtrar</Button>
        </Col>
      </Row>
    </Form>
  );
}

FilterBar.propTypes = {
  onFilterSubmit: PropTypes.func.isRequired,
};
