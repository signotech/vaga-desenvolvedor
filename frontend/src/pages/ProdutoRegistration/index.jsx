import Header from '../../components/Header';
import FilterablePaginatedProdutoTable from './components/FilterablePaginatedProdutoTable';

export default function ProdutoRegistration() {
  return (
    <div>
      <Header title="Cadastro de produtos" />
      <FilterablePaginatedProdutoTable />
    </div>
  );
}
