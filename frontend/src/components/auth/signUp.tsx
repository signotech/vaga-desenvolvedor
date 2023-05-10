import React, { useState } from "react";
import useAuth from "../../contextApi/hook/useAuth";

export default function SignUp() {
    const [nome, setNome] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [cpf, setCpf] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const { signUp } = useAuth()

    const submit = (event: any) => {
        event.preventDefault()
        if (signUp) signUp(nome, email, cpf, password, confirmPassword, false)
    }

    return (
        <>
            <div className="sign-title">
                <h1>Crie sua conta</h1>
            </div>

            <div className="sign-form">
                <form className="row">
                    <div className="col s12 m6">
                        <label htmlFor="user-name">Nome:</label>
                        <input placeholder={"Seu nome que será usado na plataforma"} type="text" name="userName"
                            id="user-name" value={nome} onChange={e => setNome(e.target.value)} />
                    </div>

                    <div className="col s12 m6">
                        <label htmlFor="user-email">Email:</label>
                        <input type="text" name="email" id="user-email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="col s12 m6">
                        <label htmlFor="user-cpf">CPF:</label>
                        <input type="text" name="cpf" id="user-cpf" value={cpf} onChange={e => setCpf(e.target.value)} />
                    </div>

                    <div className="col s12 m6">
                        <label htmlFor="user-password">Senha:</label>
                        <input type="password" name="password" id="user-password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="col s12 m6">
                        <label htmlFor="user-confirm">Confirme sua senha:</label>
                        <input type="password" name="confirmPassword" id="user-confirm" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                </form>

                <div className="submit-button">
                        <button onClick={(event) => submit(event)}>Cadastrar</button>
                    </div>

                    <div className="submit-button">
                        <button>
                            <a href="/auth/signIn" className="black-text"> Já possui uma conta? Acesse aqui </a>
                        </button>
                    </div>
            </div>
        </>
    )
}