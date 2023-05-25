import { Button } from "@components/atoms/Button"
import { Input } from "@components/atoms/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Dialog from "@radix-ui/react-dialog"
import { api } from "@utils/api"
import { CurrencyDollarSimple, IdentificationCard, Package, ShoppingBag, X } from "phosphor-react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CreateProductDialog = {
    refetch: () => void
}


const formSchema = z.object({
    titulo: z.string().min(3, "O título é obrigatório"),
    sku: z.string().min(6, "Insira um SKU válido"),
    preco: z.string().min(0),
    estoque: z.number()
})

type FormSchema = z.infer<typeof formSchema>

export const CreateProductDialog:React.FC<CreateProductDialog> = ({refetch}) => {

    const [reqError, setReqError] = useState('')    
    const {register, handleSubmit, formState: {errors}} = useForm<FormSchema>({
        resolver: zodResolver(formSchema)
    })

    const handleCreateProduct:SubmitHandler<FormSchema> = async(data) => {
        try{
            await api.post("/product", data)
            toast("Produto registrado.")
            refetch()
        }catch(err:any){
            setReqError(err.response.data.message)
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="w-full">
                <Button text="Adicionar produto" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/40 inset-0 fixed z-0 h-screen w-screen' />
                <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[600px] bg-white flex flex-col p-8 rounded-lg'>
                    <ToastContainer />
                    <div className="flex justify-between mb-4 items-center">
                        <Dialog.Title className='text-xl lg:text-2xl font-semibold'>Adicionar produto</Dialog.Title>
                        <Dialog.Close>
                            <X size={32} className="text-gray-800" />
                        </Dialog.Close>
                    </div>
                    <Dialog.Description className='mb-8 text-sm lg:text-md'>Preencha os campos do formulário para registrar um novo produto.</Dialog.Description>
                    <form onSubmit={handleSubmit(handleCreateProduct)} className="flex flex-col gap-4">
                        <Input register={register} name="titulo" id="titulo" placeholder="Título" type="text" ><ShoppingBag className="text-gray-500" size={24} /></Input>
                        {errors.titulo?.message ? <span className="text-red-300">{errors.titulo.message}</span> : null}
                        <Input register={register} name="sku" id="sku" type="text" placeholder="SKU" ><IdentificationCard className="text-gray-500" size={24} /></Input>
                        {errors.sku?.message ? <span className="text-red-300">{errors.sku.message}</span> : null}
                        <Input register={register} name="preco" id="preco" type="text" placeholder="Preço" ><CurrencyDollarSimple className="text-gray-500" size={24} /></Input>
                        {errors.preco?.message ? <span className="text-red-300">{errors.preco.message}</span> : null}
                        <Input register={register} name="estoque" id="estoque" type="number" placeholder="Estoque" ><Package className="text-gray-500" size={24} /></Input>
                        {errors.estoque?.message ? <span className="text-red-300">{errors.estoque.message}</span> : null}
                        <Button text="Cadastrar" />
                        {reqError !== '' ? <span className="text-red-300">{reqError}</span> : null}
                    </form>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>

    )

}
