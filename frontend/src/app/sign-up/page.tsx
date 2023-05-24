'use client'
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import Link from "next/link"
import { LockSimple, SignIn as SignInIcon, UserCircle } from "phosphor-react"

const SignUp = () => {

    return (
        <main className="flex flex-col items-center justify-center bg-sign-up bg-cover bg-no-repeat  h-screen">
            <form className="flex flex-col gap-4 max-w-[600px] bg-white w-11/12 rounded items-center px-6 py-8 lg:px-8 lg:py-12">
                <h1 className="text-lg lg:text-2xl font-semibold text-gray-800 mb-4">Registre-se</h1>
                <Input name="login" id="login" type="text" required placeholder="Login">
                    <UserCircle size={24} />
                </Input>
                <Input name="senha" id="senha" type="password" required placeholder="Senha" >
                    <LockSimple size={24} />
                </Input>
                <Input name="confirma_senha" id="confirmar_senha" type="password" required placeholder="Confirmar senha" >
                    <LockSimple size={24} />
                </Input>
                <Button text="Criar conta" type="submit" />
                <div className="mt-8 flex gap-2 lg:gap-4 items-center">
                    <SignInIcon className="text-blue-400" size={32} />
                    <Link href={'/sign-in'} className="text-gray-800 hover:text-black transition-colors">Fazer login</Link>
                </div>
            </form>

        </main>
    )

}

export default SignUp