import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function ItemsPerPageAdjuster({ onItemsPerPageSubmit }) {
  const [itemsPerPage, setItemsPerPage] = useState('20');

  const submitItemsPerPage = (e) => {
    e.preventDefault();
    onItemsPerPageSubmit(Number(itemsPerPage));
  };

  return (
    <Form onSubmit={submitItemsPerPage}>
      <Row className="g-2 align-items-end">
        <Col xs="auto">
          <Form.Label htmlFor="itemsPerPage">
            Itens por página
          </Form.Label>
          <Form.Control
            type="number"
            name="itemsPerPage"
            id="itemsPerPage"
            min={1}
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button type="submit">Aplicar</Button>
        </Col>
      </Row>
    </Form>
  );
}

ItemsPerPageAdjuster.propTypes = {
  onItemsPerPageSubmit: PropTypes.func.isRequired,
};
