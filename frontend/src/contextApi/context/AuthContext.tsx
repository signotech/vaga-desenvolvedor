import Axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { baseApiUrl, showMessage } from "../../global";
import { usuarioModel } from "../../models/interface";

interface AuthContextProps {
    logIn?: (name: string, password: string) => void
    signUp?: (nome: string, email: string, cpf: string, password: string, confirmPassword: string, isAdmin: boolean) => void
    logOut?: () => void
    user: usuarioModel
}

const AuthContext = createContext<AuthContextProps>({
    logIn: function (): void { },
    signUp: function (): void { },
    user: {id: 0, nome: "", email: "", cpf: "", isAdmin: 0}
})

export function AuthProvider(props: any) {
    const [user, setUser] = useState<any>()

    useEffect(() => {
        const userLogged: usuarioModel = JSON.parse(`${localStorage.getItem("user_logged")}`)
        if(userLogged) {
            setUser(userLogged)
        } else {
            const pathName = window.location.pathname
            if(pathName !== "/auth/signIn" && window.location.pathname !== "/auth/signUp") {
                window.location.replace("/auth/signIn")
            }
            console.log(pathName !== "/auth/signIn")
        }
    }, [])

    async function signUp(nome: string, email: string, cpf: string, password: string, confirmPassword: string, isAdmin: boolean) {
        Axios.post(`${baseApiUrl}/auth/signUp`, {nome, email, cpf, password, confirmPassword, isAdmin})
            .then(resp => {
                showMessage(resp.data).successMessage()
                setInterval(() => window.location.replace("/auth/signIn"))
            })
            .catch(err => {
                console.log(err)
                showMessage("Erro ao cadastrar usuário").errorMessage()
            })
    }

    function logIn(email: string, password: string) {
        Axios.post(`${baseApiUrl}/auth/signIn`, { email, password })
            .then(resp => {
                localStorage.setItem("user_logged", JSON.stringify(resp.data))
                window.location.replace("/produtos")
            })
            .catch(err => showMessage(err.response.data).errorMessage())
    }

    function logOut() {
        localStorage.removeItem("user_logged")
        window.location.replace("/auth/signIn")
    }

    return (
        <AuthContext.Provider value={{
            signUp,
            logIn,
            logOut,
            user
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext