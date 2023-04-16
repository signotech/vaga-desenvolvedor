import React from 'react';
import ReactDOM from 'react-dom/client';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import './css/main.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './pages/Root';
import Customers from './pages/Customers';
import NewCustomer from './pages/NewCustomer';
import customerServices from './services/customerServices';
import productServices from './services/productServices';
import NewProduct from './pages/NewProduct';
import Products from './pages/Products';
import Orders from './pages/Orders';
import orderServices from './services/orderServices';
import NewOrder from './pages/NewOrder';
import SingleOrder from './pages/SingleOrder';
import SingleProduct from './pages/SingleProduct';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/clientes',
        element: <Customers />,
        loader: () => customerServices.getCustomers(),
      },
      {
        path: '/clientes/novo',
        element: <NewCustomer />
      },
      {
        path: '/pedidos/cliente/:id',
        element: <Orders />,
        loader: async ({ params }) => {
          const orders = await orderServices.getOrders({}, params.id);
          const customer = await customerServices.getCustomers({ id: params.id });
          return {
            orders,
            customer: customer[0]
          }
        }
      },
      {
        path: '/pedidos/cliente/:id/novo',
        element: <NewOrder />,
        loader: () => productServices.getProducts()
      },
      {
        path: '/pedidos/cliente/:id_cliente/:id_pedido',
        element: <SingleOrder />,
        loader: ({ params }) => orderServices.getSingleOrder(params)
      },
      {
        path: '/produtos',
        element: <Products />,
        loader: () => productServices.getProducts()
      },
      {
        path: '/produtos/novo',
        element: <NewProduct />
      },
      {
        path: '/produtos/editar/:id_produto',
        element: <SingleProduct />,
        loader: ({ params }) => productServices.getSingleProduct(params.id_produto)
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);