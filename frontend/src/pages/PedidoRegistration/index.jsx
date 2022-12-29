import Container from 'react-bootstrap/Container';
import Header from '../../components/Header';
import FilterablePaginatedPedidoTable from './components/FilterablePaginatedPedidoTable';

export default function PedidoRegistration() {
  return (
    <Container className="my-4 col-lg-8">
      <Header />
      <FilterablePaginatedPedidoTable />
    </Container>
  );
}
