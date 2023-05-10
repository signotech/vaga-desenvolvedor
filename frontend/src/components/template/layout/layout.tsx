import React from "react"
import useAuth from "../../../contextApi/hook/useAuth"
import Cart from "../cart/cart"
import Footer from "../footer/footer"
import Header from "../header/Header"

import "./layout.css"

interface layoutProps {
    children: any
    showCart?: boolean
    showNavegation?: boolean
}

export default function Layout(props: layoutProps) {
    const { user } = useAuth()

    return (
        <div className="app">
            <Header showNavegation={props.showNavegation} />

            <main style={{position: "relative"}}>
                {props.children}
                {props.showCart || !user?.isAdmin ? <Cart /> : <></>}
            </main>

            <Footer />
        </div>
    )
}