import { useState } from 'react';
import PedidoTable from './PedidoTable';
import FilterBar from './FilterBar';
import Pagination from '../../../components/Pagination';
import ItemsPerPageAdjuster from '../../../components/ItemsPerPageAdjuster';

export default function FilterablePaginatedPedidoTable() {
  const [pedidos, setPedidos] = useState([]);
  const [filter, setFilter] = useState({
    text: '',
    field: '',
  });
  const [sort, setSort] = useState({
    field: 'codigoPedido',
    order: 'asc',
  });
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div>
      <FilterBar onFilterSubmit={setFilter} />
      <PedidoTable
        pedidos={pedidos}
        onPedidosChange={setPedidos}
        filter={filter}
        sort={sort}
        onSortChange={setSort}
        itemsPerPage={itemsPerPage}
        pageNumber={pageNumber}
      />
      <Pagination
        pageNumber={pageNumber}
        itemsPerPage={itemsPerPage}
        currentPageLength={pedidos.length}
        onPageNumberChange={setPageNumber}
      />
      <ItemsPerPageAdjuster
        onItemsPerPageSubmit={setItemsPerPage}
      />
    </div>
  );
}
