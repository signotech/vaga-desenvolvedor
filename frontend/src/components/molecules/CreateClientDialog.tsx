import { Button } from "@components/atoms/Button"
import { Input } from "@components/atoms/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Dialog from "@radix-ui/react-dialog"
import { api } from "@utils/api"
import { EnvelopeSimple, IdentificationCard, Person, X } from "phosphor-react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CreateClientDialog = {
    refetch: () => void
}

const formSchema = z.object({
    nome: z.string().min(3, "O nome é obrigatório"),
    email: z.string().min(3, "O email é obrigatório").email("Insira um email válido."),
    cpf: z.string().length(11, "Insira um cpf válido")
})

type FormSchema = z.infer<typeof formSchema>

export const CreateClientDialog:React.FC<CreateClientDialog> = ({refetch}) => {

    const [reqError, setReqError] = useState('')
    const {register, handleSubmit, formState: {errors}} = useForm<FormSchema>({
        resolver:zodResolver(formSchema)
    })

    const handleCreateClient:SubmitHandler<FormSchema> = async(data) => {
        try{
            await api.post('/client', data)
            toast("Cliente adicionado!")
            refetch()
        }catch(err:any){
            setReqError(err.response.data.message)
        }
    }
    return (
        <Dialog.Root>
            <Dialog.Trigger className="w-full">
                <Button text="Adicionar cliente" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/40 inset-0 fixed z-0 h-screen w-screen' />
                <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[600px] bg-white flex flex-col p-8 rounded-lg'>
                    <ToastContainer />
                    <div className="flex justify-between mb-4 items-center">
                        <Dialog.Title className='text-xl lg:text-2xl font-semibold'>Adicionar cliente</Dialog.Title>
                        <Dialog.Close>
                            <X size={32} className="text-gray-800" />
                        </Dialog.Close>
                    </div>
                    <Dialog.Description className='mb-8 text-sm lg:text-md'>Preencha os campos do formulário para registrar um novo cliente.</Dialog.Description>
                    <form onSubmit={handleSubmit(handleCreateClient)} className="flex flex-col gap-4">
                        <Input register={register} name="nome" id="nome" placeholder="Nome" type="text" ><Person className="text-gray-500" size={24} /></Input>
                        {errors?.nome?.message ? <span className="text-red-300">{errors.nome.message}</span> : null}
                        <Input register={register} name="email" id="email" type="email" placeholder="Email" ><EnvelopeSimple className="text-gray-500" size={24} /></Input>
                        {errors?.email?.message ? <span className="text-red-300">{errors.email.message}</span> : null}
                        <Input register={register} name="cpf" id="cpf" type="text" placeholder="CPF (Apenas números)" ><IdentificationCard className="text-gray-500" size={24} /></Input>
                        {errors?.cpf?.message ? <span className="text-red-300">{errors.cpf.message}</span> : null}
                        <Button text="Cadastrar" />
                        {reqError !== '' ? <span className="text-red-300">{reqError}</span> : null}
                    </form>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>

    )

}