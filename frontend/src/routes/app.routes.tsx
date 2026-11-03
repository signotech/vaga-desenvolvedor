import { Navigate, useRoutes } from 'react-router-dom';
import { APP_ROUTES } from '@/constants/app/app.constants';
import { MainLayout } from '@/layouts/main.layout';
import { LoginPage } from '@/pages/auth/login.page';
import { ClienteListPage } from '@/pages/clientes/cliente-list.page';
import { HomePage } from '@/pages/home/home.page';
import { PedidoListPage } from '@/pages/pedidos/pedido-list.page';
import { ProdutoListPage } from '@/pages/produtos/produto-list.page';
import { ProtectedRoute } from '@/routes/protected-route.component';

export function AppRoutes() {
  return useRoutes([
    { path: APP_ROUTES.login, element: <LoginPage /> },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <MainLayout />,
          children: [
            { index: true, element: <HomePage /> },
            { path: APP_ROUTES.clientes.replace('/', ''), element: <ClienteListPage /> },
            { path: APP_ROUTES.produtos.replace('/', ''), element: <ProdutoListPage /> },
            { path: APP_ROUTES.pedidos.replace('/', ''), element: <PedidoListPage /> },
            { path: '*', element: <Navigate to={APP_ROUTES.home} replace /> },
          ],
        },
      ],
    },
  ]);
}
