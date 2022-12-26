import { useState } from 'react';
import ProdutoTable from './ProdutoTable';
import FilterBar from './FilterBar';
import Pagination from '../../../components/Pagination';
import ItemsPerPageAdjuster from '../../../components/ItemsPerPageAdjuster';

export default function FilterablePaginatedProdutoTable() {
  const [produtos, setProdutos] = useState([]);
  const [filter, setFilter] = useState({
    text: '',
    field: '',
  });
  const [sort, setSort] = useState({
    field: 'tituloProduto',
    order: 'asc',
  });
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div>
      <FilterBar onFilterSubmit={setFilter} />
      <ProdutoTable
        produtos={produtos}
        onProdutosChange={setProdutos}
        filter={filter}
        sort={sort}
        onSortChange={setSort}
        itemsPerPage={itemsPerPage}
        pageNumber={pageNumber}
      />
      <Pagination
        pageNumber={pageNumber}
        itemsPerPage={itemsPerPage}
        currentPageLength={produtos.length}
        onPageNumberChange={setPageNumber}
      />
      <ItemsPerPageAdjuster
        onItemsPerPageSubmit={setItemsPerPage}
      />
    </div>
  );
}
