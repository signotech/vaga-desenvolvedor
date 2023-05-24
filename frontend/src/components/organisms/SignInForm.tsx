import { Button } from "@components/atoms/Button"
import { TitleForm } from "@components/atoms/TitleForm"
import { Input } from "@components/molecules/Input"
import Link from "next/link"
import { LockSimple, SignIn, UserCircle } from "phosphor-react"

export const SignInForm = () => {

    return (

        <form className="flex flex-col gap-4 max-w-[600px] bg-white w-11/12 rounded items-center px-6 py-8 lg:px-8 lg:py-12">
            <TitleForm text="Faça seu login" />
            <Input name="login" id="login" type="text" required placeholder="Login">
                <UserCircle size={24} />
            </Input>
            <Input name="senha" id="senha" type="password" required placeholder="Senha" >
                <LockSimple size={24} />
            </Input>
            <Button text="Entrar" type="submit" />
            <div className="mt-8 flex gap-2 lg:gap-4 items-center">
                <SignIn className="text-blue-400" size={32} />
                <Link href={'/sign-up'} className="text-gray-800 hover:text-black transition-colors">Criar uma conta</Link>
            </div>
        </form>

    )

}