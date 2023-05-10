import React, { useEffect } from "react"
import ClientsTemplate from "../components/admin/clients/clientsTemplate";
import Layout from "../components/template/layout/layout";
import { usuarioModel } from "../models/interface";

export default function Clients() {

    useEffect(() => {
        const userLogged: usuarioModel = JSON.parse(`${localStorage.getItem("user_logged")}`)

        if(!userLogged.isAdmin) window.location.replace("/produtos")
    }, [])

    return (
        <Layout showNavegation showCart>
            <ClientsTemplate page={1} />
        </Layout>
    )
}