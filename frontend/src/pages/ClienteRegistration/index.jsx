import FilterablePaginatedClienteTable from './components/FilterablePaginatedClienteTable';
import Header from '../../components/Header';

export default function ClienteRegistration() {
  return (
    <div>
      <Header title="Cadastro de clientes" />
      <FilterablePaginatedClienteTable />
    </div>
  );
}