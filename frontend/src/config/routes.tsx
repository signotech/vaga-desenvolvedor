import React from "react"
import { Routes, Route } from "react-router-dom"
import Auth from "../pages/auth"
import Clients from "../pages/clients"
import Pedidos from "../pages/pedidos"
import HomePage from "../pages/Products"
import Category from "../pages/category"

export default function RoutesControl() {
    return (
        <Routes>
            <Route path="/produtos" element={<HomePage />} />
            <Route path="/clientes" element={<Clients />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/categorias" element={<Category />} />
            <Route path="/auth/:operation" element={<Auth />} />
        </Routes>
    )
}