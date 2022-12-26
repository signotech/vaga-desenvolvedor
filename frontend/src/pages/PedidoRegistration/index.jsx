import Header from '../../components/Header';
import FilterablePaginatedPedidoTable from './components/FilterablePaginatedPedidoTable';

export default function PedidoRegistration() {
  return (
    <div>
      <Header title="Cadastro de pedidos de compra" />
      <FilterablePaginatedPedidoTable />
    </div>
  );
}
