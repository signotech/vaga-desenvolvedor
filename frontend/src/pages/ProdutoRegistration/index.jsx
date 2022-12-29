import Container from 'react-bootstrap/Container';
import Header from '../../components/Header';
import FilterablePaginatedProdutoTable from './components/FilterablePaginatedProdutoTable';

export default function ProdutoRegistration() {
  return (
    <Container className="my-4 col-lg-8">
      <Header />
      <FilterablePaginatedProdutoTable />
    </Container>
  );
}
