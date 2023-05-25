import { AddProductInput } from '@components/atoms/AddProductInput'
import { Button } from '@components/atoms/Button'
import { Input } from '@components/atoms/Input'
import { SelectStatus } from '@components/atoms/SelectStatus'
import * as Dialog from '@radix-ui/react-dialog'
import { Calendar, CurrencyDollarSimple, IdentificationCard, Notebook, X } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AddOrderProductForm } from './AddOrderProductForm'


export const CreateOrderDialog = () => {


    const [orderProducts, setOrderProducts] = useState([])

    const addOrderProduct = () => {

    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="w-full">
                <Button text="Adicionar pedido" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/40 inset-0 fixed z-0 h-screen w-screen' />
                <Dialog.Content className='fixed top-1/2 left-1/2 gap-6 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[800px] overflow-y-scroll max-h-[80vh] bg-white flex flex-col p-8 rounded-lg'>
                    <div className="flex flex-col">
                        <div className="flex justify-between mb-4 items-center">
                            <Dialog.Title className='text-xl lg:text-2xl font-semibold'>Adicionar pedido</Dialog.Title>
                            <Dialog.Close>
                                <X size={32} className="text-gray-800" />
                            </Dialog.Close>
                        </div>
                        <Dialog.Description className='mb-8 text-sm lg:text-md'>Preencha os campos do formulário para registrar um novo produto.</Dialog.Description>

                    </div>
                    <form className="flex flex-col gap-4">
                        <Input name="id_cliente" id="id_cliente" placeholder="Id do cliente" type="number" ><IdentificationCard className="text-gray-500" size={24} /></Input>
                        <Input name="data" id="data" type="date" placeholder="Data" ><Calendar className="text-gray-500" size={24} /></Input>
                        <SelectStatus />
                        <Input name="desconto" id="desconto" type="text" placeholder="Desconto (em porcentagem)" defaultValue={0} ><CurrencyDollarSimple className="text-gray-500" size={24} /></Input>
                    </form>
                    <AddOrderProductForm />

                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>


    )

}