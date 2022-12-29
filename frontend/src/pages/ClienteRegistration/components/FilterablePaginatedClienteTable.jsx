import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ClienteTable from './ClienteTable';
import FilterBar from './FilterBar';
import Pagination from '../../../components/Pagination';
import ItemsPerPageAdjuster from '../../../components/ItemsPerPageAdjuster';

export default function FilterablePaginatedClienteTable() {
  const [clientes, setClientes] = useState([]);
  const [filter, setFilter] = useState({
    text: '',
    field: '',
  });
  const [sort, setSort] = useState({
    field: 'nomeCliente',
    order: 'asc',
  });
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div>
      <FilterBar onFilterSubmit={setFilter} />
      <ClienteTable
        clientes={clientes}
        onClientesChange={setClientes}
        filter={filter}
        sort={sort}
        onSortChange={setSort}
        itemsPerPage={itemsPerPage}
        pageNumber={pageNumber}
      />
      <Row className="justify-content-between align-items-end">
        <Col xs="auto">
          <ItemsPerPageAdjuster
            onItemsPerPageSubmit={setItemsPerPage}
          />
        </Col>
        <Col xs="auto">
          <Pagination
            pageNumber={pageNumber}
            itemsPerPage={itemsPerPage}
            currentPageLength={clientes.length}
            onPageNumberChange={setPageNumber}
          />
        </Col>
      </Row>
    </div>
  );
}
