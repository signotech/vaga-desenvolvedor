import { TitleForm } from "@components/atoms/TitleForm"
import { Button } from "@components/atoms/Button"
import { Input } from "@components/molecules/Input"
import Link from "next/link"
import { LockSimple, SignIn, UserCircle } from "phosphor-react"

export const SignUpForm = () => {

    return (
            <form className="flex flex-col gap-4 max-w-[600px] bg-white w-11/12 rounded items-center px-6 py-8 lg:px-8 lg:py-12">
                <TitleForm text="Registre-se" />
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
                    <SignIn className="text-blue-400" size={32} />
                    <Link href={'/sign-in'} className="text-gray-800 hover:text-black transition-colors">Fazer login</Link>
                </div>
            </form>

    )

}