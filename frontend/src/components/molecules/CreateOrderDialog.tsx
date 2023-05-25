import { AddProductInput } from '@components/atoms/AddProductInput'
import { Button } from '@components/atoms/Button'
import { Input } from '@components/atoms/Input'
import { SelectStatus } from '@components/atoms/SelectStatus'
import * as Dialog from '@radix-ui/react-dialog'
import { Calendar, CurrencyDollarSimple, IdentificationCard, Notebook, X } from 'phosphor-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { AddOrderProductForm } from './AddOrderProductForm'
import { api } from '@utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

type CreateOrdertDialog = {
    refetch: () => void
}

const formSchema = z.object({
    id_cliente: z.number().min(1, "O id é obrigatório"),
    data: z.string(),
    desconto: z.number().int().min(0, "Insira um número maior que 0").max(100, "Insira um número menor que 100"),
    status: z.number().int().min(0, "Selecione um status").max(2, "Selecione um status")
})

type FormSchema = z.infer<typeof formSchema>

export const CreateOrderDialog: React.FC<CreateOrdertDialog> = ({ refetch }) => {

    const [reqError, setReqError] = useState('')
    const [orderProducts, setOrderProducts] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm<FormSchema>({
        resolver: zodResolver(formSchema)
    })

    const handleCreateOrder: SubmitHandler<FormSchema> = async (data) => {
        if(orderProducts.length === 0){
            setReqError("Adicione pelo menos um produto")
            return
        }
        try {
            const body = {
                ...data,
                ids_produtos: orderProducts
            }
            console.log(body)
            await api.post('/order', body)
            toast("Pedido adicionado!")
            refetch()
        } catch (err: any) {
            console.log(err)
            setReqError(err.response.data.message)
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="w-full">
                <Button text="Adicionar pedido" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/40 inset-0 fixed z-0 h-screen w-screen' />
                <Dialog.Content className='fixed top-1/2 left-1/2 gap-6 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[800px] overflow-y-scroll max-h-[80vh] bg-white flex flex-col p-8 rounded-lg'>
                    <ToastContainer />
                    <div className="flex flex-col">
                        <div className="flex justify-between mb-4 items-center">
                            <Dialog.Title className='text-xl lg:text-2xl font-semibold'>Adicionar pedido</Dialog.Title>
                            <Dialog.Close>
                                <X size={32} className="text-gray-800" />
                            </Dialog.Close>
                        </div>
                        <Dialog.Description className='mb-8 text-sm lg:text-md'>Preencha os campos do formulário para registrar um novo produto.</Dialog.Description>

                    </div>
                    <AddOrderProductForm orderProducts={orderProducts} setOrderProducts={setOrderProducts} />
                    <form onSubmit={handleSubmit(handleCreateOrder)} className="flex flex-col gap-4">
                        <Input register={register} name="id_cliente" id="id_cliente" placeholder="Id do cliente" type="number" ><IdentificationCard className="text-gray-500" size={24} /></Input>
                        {errors.id_cliente?.message ? <span className='text-red-400'>{errors.id_cliente.message}</span> : null}
                        <Input register={register} name="data" id="data" type="date" placeholder="Data" ><Calendar className="text-gray-500" size={24} /></Input>
                        {errors.data?.message ? <span className='text-red-400'>{errors.data.message}</span> : null}
                        <SelectStatus name="status" register={register} />
                        {errors.status?.message ? <span className='text-red-400'>{errors.status.message}</span> : null}
                        <Input register={register} name="desconto" id="desconto" type="number" placeholder="Desconto (em porcentagem)"  ><CurrencyDollarSimple className="text-gray-500" size={24} /></Input>
                        {errors.desconto?.message ? <span className='text-red-400'>{errors.desconto.message}</span> : null}
                        <Button text="Cadastrar" />
                        {reqError !== '' ? <span className="text-red-300">{reqError}</span> : null}
                    </form>

                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>


    )

}