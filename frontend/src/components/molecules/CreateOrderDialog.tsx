import { AddProductInput } from '@components/atoms/AddProductInput'
import { Button } from '@components/atoms/Button'
import { Input } from '@components/atoms/Input'
import { SelectStatus } from '@components/atoms/SelectStatus'
import * as Dialog from '@radix-ui/react-dialog'
import { Calendar, CurrencyDollarSimple, IdentificationCard, Notebook, X } from 'phosphor-react'
import { OrderProduct } from './OrderProduct'
import { useState } from 'react'

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
                <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[800px] bg-white flex flex-col p-8 rounded-lg'>
                    <div className="flex justify-between mb-4 items-center">
                        <Dialog.Title className='text-xl lg:text-2xl font-semibold'>Adicionar pedido</Dialog.Title>
                        <Dialog.Close>
                            <X size={32} className="text-gray-800" />
                        </Dialog.Close>
                    </div>
                    <Dialog.Description className='mb-8 text-sm lg:text-md'>Preencha os campos do formulário para registrar um novo produto.</Dialog.Description>
                    <form className="flex flex-col gap-4">
                        <Input name="id_cliente" id="id_cliente" placeholder="Id do cliente" type="number" ><IdentificationCard className="text-gray-500" size={24} /></Input>
                        <Input name="data" id="data" type="date" placeholder="Data" ><Calendar className="text-gray-500" size={24} /></Input>
                        <SelectStatus />
                        <Input name="status" id="status" type="text" placeholder="status" ><Notebook className="text-gray-500" size={24} /></Input>
                        <Input name="desconto" id="desconto" type="text" placeholder="Desconto (em porcentagem)" defaultValue={0} ><CurrencyDollarSimple className="text-gray-500" size={24} /></Input>

                        <span>Produtos:</span>
                        <div className="flex gap-4">
                            <AddProductInput placeholder='Id do produto' />
                            <AddProductInput placeholder='Quantidade' />
                            <Button text='adicionar' />
                        </div>
                        <div className='grid grid-cols-3'>
                            <span className='col-span-1'>Id</span>
                            <span className='col-span-1'>Quantidade</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <OrderProduct />
                        </div>
                        <Button text="Cadastrar" />
                    </form>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>


    )

}