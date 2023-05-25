import { TitleForm } from "@components/atoms/TitleForm"
import { Button } from "@components/atoms/Button"
import { Input } from "@components/atoms/Input"
import Link from "next/link"
import { LockSimple, SignIn, UserCircle } from "phosphor-react"
import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@utils/api"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useState } from "react"
import { setCurrentUser } from "@store/user/user-reducer"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    login: z.string().min(3, 'Insira o login'),
    senha: z.string().min(3, 'Insira a senha'),
    confirmar_senha: z.string().min(3, 'Insira a confirmar senha.')
}).refine(data => data.senha === data.confirmar_senha, {
    message: 'As senhas devem ser iguais',
    path: ['confirmar_senha']
})

type formSchema = z.infer<typeof formSchema>

export const SignUpForm = () => {

    const [reqError, setReqError] = useState('')
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { register, handleSubmit, formState: {errors} } = useForm<formSchema>({
        resolver: zodResolver(formSchema)
    })

    const handleSignUp: SubmitHandler<formSchema> = async (data) => {
        try {
            const response = await api.post('/auth/sign-up', data)
            dispatch(setCurrentUser({ token: response.data.token }))
            router.push("/")
        } catch (err: any) {
            setReqError(err.response.data.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-4 max-w-[600px] bg-white w-11/12 rounded items-center px-6 py-8 lg:px-8 lg:py-12">
            <TitleForm text="Registre-se" />
            <Input register={register} name="login" id="login" type="text" required placeholder="Login">
                <UserCircle size={24} />
            </Input>
            {errors?.login?.message ? <span className="text-red-400 w-full text-left">{errors.login.message}</span> : null}
            <Input register={register} name="senha" id="senha" type="password" required placeholder="Senha" >
                <LockSimple size={24} />
            </Input>
            {errors?.senha?.message ? <span className="text-red-400 w-full text-left">{errors.senha.message}</span> : null}
            <Input register={register} name="confirmar_senha" id="confirmar_senha" type="password" required placeholder="Confirmar senha" >
                <LockSimple size={24} />
            </Input>
            {errors?.confirmar_senha?.message ? <span className="text-red-400 w-full text-left">{errors.confirmar_senha.message}</span> : null}
            <Button text="Criar conta" type="submit" />
            {reqError !== '' ? <span className="text-red-400 w-full text-left">{reqError}</span> : null}
            <div className="mt-8 flex gap-2 lg:gap-4 items-center">
                <SignIn className="text-blue-400" size={32} />
                <Link href={'/sign-in'} className="text-gray-800 hover:text-black transition-colors">Fazer login</Link>
            </div>
        </form>

    )

}