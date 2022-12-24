import { useState } from 'react';
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
      <Pagination
        pageNumber={pageNumber}
        itemsPerPage={itemsPerPage}
        currentPageLength={clientes.length}
        onPageNumberChange={setPageNumber}
      />
      <ItemsPerPageAdjuster
        onItemsPerPageSubmit={setItemsPerPage}
      />
    </div>
  );
}
