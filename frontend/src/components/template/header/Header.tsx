import React, { useState, useEffect } from "react"
import useAuth from "../../../contextApi/hook/useAuth"

import logo from "../../../img/logo-signo.svg"

import "./header.css"

interface HeaderProps {
    showNavegation?: boolean
}

export default function Header(props: HeaderProps) {
    const [showMenu, setShowMenu] = useState<boolean>(false)

    const { user, logOut } = useAuth()

    function sair(e: any) {
        e.preventDefault()
        if (logOut) logOut()
    }

    function menuVisibility() {
        const menu = document.querySelector(".navegation")

        if(menu) menu.classList.toggle("show-navegation")
    }

    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>

                <div className="menu-hamburger" style={{left: showMenu ? "-115px" : "0px"}}>
                    <button onClick={() => {
                        menuVisibility()
                        setShowMenu(!showMenu)
                    }} title={showMenu ? "Esconder Menu" : "Mostrar Menu"}>
                        <div className="menu-icon">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30" height="40" fill="#fff">
                                    <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z">
                                    </path>
                                </svg>
                            </span>
                        </div>
                    </button>
                </div>

                {props.showNavegation ? (
                    <div className={"navegation"}>
                        <nav>
                            {user?.isAdmin ? (
                                <>
                                    <div className="nav-item">
                                        <a href="/categorias" className="hoverable Clientes">Categorias</a>
                                    </div>

                                    <div className="nav-item">
                                        <a href="/clientes" className="hoverable Clientes">Clientes</a>
                                    </div>
                                </>
                            ) : <></>}

                            <div className="nav-item">
                                <a href="/produtos" className="hoverable Produtos">Produtos</a>
                            </div>
                            <div className="nav-item">
                                <a href="/pedidos" className="hoverable Pedidos">Pedido</a>
                            </div>
                            <div className="nav-item">
                                <a href="/pedido" className="hoverable Pedidos" onClick={e => sair(e)}>Sair</a>
                            </div>
                        </nav>
                    </div>
                ) : <></>}
            </div>
        </header>
    )
}