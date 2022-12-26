import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import ClienteRegistration from './pages/ClienteRegistration';
import NotFound from './pages/NotFound';
import PedidoRegistration from './pages/PedidoRegistration';
import ProdutoRegistration from './pages/ProdutoRegistration';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="/clientes" />} />
        <Route path="/clientes" element={<ClienteRegistration />} />
        <Route path="/produtos" element={<ProdutoRegistration />} />
        <Route path="/pedidos" element={<PedidoRegistration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
