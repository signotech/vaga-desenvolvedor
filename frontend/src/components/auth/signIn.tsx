import React, { useState } from "react";
import useAuth from "../../contextApi/hook/useAuth";

export default function SignIn() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const { logIn } = useAuth()

    const submit = (event: any) => {
        event.preventDefault()
        if (logIn) logIn(email, password)
    }

    return (
        <>
            <div className="sign-title">
                <h1>Entrar</h1>
            </div>

            <div className="sign-form">
                <form>
                    <div className="row">
                        <div className="col s12 m6">
                            <label htmlFor="user-email">Email</label>
                            <input placeholder={"Seu email usado na plataforma"} type="text" name="user-email"
                                id="user-email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="col s12 m6">
                            <label htmlFor="user-password">Senha:</label>
                            <input type="password" name="password" id="user-password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="submit-button">
                        <button onClick={(event) => submit(event)}> Entrar </button>
                    </div>

                    <div className="submit-button">
                        <button>
                            <a href="/auth/signUp" className="black-text"> Não tem uma conta? Cadastre-se aqui </a>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}