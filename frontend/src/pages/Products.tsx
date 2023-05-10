import React from "react"
import ProductsAdmin from "../components/admin/products/productsAdmin";
import Products from "../components/products/products";
import Layout from "../components/template/layout/layout";
import useAuth from "../contextApi/hook/useAuth";

export default function HomePage() {

    const { user } = useAuth()
    return (
        <Layout showNavegation showCart={user?.isAdmin === 0}>
            {user?.isAdmin ? <ProductsAdmin /> : <Products />}
        </Layout>
    )
}