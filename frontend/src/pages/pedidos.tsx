import React from "react"
import PedidosTemplate from "../components/pedidos/pedidos";
import Layout from "../components/template/layout/layout";
import useAuth from "../contextApi/hook/useAuth";

export default function Pedidos() {

    const { user } = useAuth()

    return (
        <Layout showNavegation showCart>
            <PedidosTemplate />
        </Layout>
    )
}