import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../pages/Clientes'
import './index.css'

import Produtos from '../pages/Produtos'
import Pedidos from '../pages/Pedidos'

import { BrowserRouter, Routes, Route} from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/clientes' element={<App />}></Route>
        <Route path='/produtos' element={<Produtos />}></Route>
        <Route path='/pedidos' element={<Pedidos />}></Route>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
