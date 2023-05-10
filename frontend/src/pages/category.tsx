import React, { useEffect } from "react"
import Categories from "../components/admin/categories/categories"
import Layout from "../components/template/layout/layout"
import { usuarioModel } from "../models/interface"

export default function Category() {

    useEffect(() => {
        const userLogged: usuarioModel = JSON.parse(`${localStorage.getItem("user_logged")}`)

        if (!userLogged.isAdmin) window.location.replace("/produtos")
    }, [])

    return (
        <Layout showNavegation>
            <Categories />
        </Layout>
    )
}