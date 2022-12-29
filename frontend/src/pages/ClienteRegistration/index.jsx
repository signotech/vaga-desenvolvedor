import Container from 'react-bootstrap/Container';
import FilterablePaginatedClienteTable from './components/FilterablePaginatedClienteTable';
import Header from '../../components/Header';

export default function ClienteRegistration() {
  return (
    <Container className="my-4 col-lg-8">
      <Header />
      <FilterablePaginatedClienteTable />
    </Container>
  );
}
