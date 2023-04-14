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