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
        loader: ({ params }) => orderServices.getOrders({}, params.id)
      },
      {
        path: '/produtos',
        element: <Products />,
        loader: () => productServices.getProducts()
      },
      {
        path: '/produtos/novo',
        element: <NewProduct />
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