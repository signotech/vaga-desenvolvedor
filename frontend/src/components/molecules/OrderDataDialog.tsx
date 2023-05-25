import { BUTTON_TYPE, Button } from '@components/atoms/Button'
import { Input } from '@components/atoms/Input'
import * as Dialog from '@radix-ui/react-dialog'
import { Calendar, CurrencyDollarSimple, IdentificationCard, Notebook, Package, ShoppingBag, X } from 'phosphor-react'
import { DeleteItemAlert } from './DeleteItemAlert'
import { SelectStatus } from '@components/atoms/SelectStatus'
import { OrderProductToShow } from './OrderProductToShow'

type OrderDataDialog = {
    children: React.ReactNode
}

export const OrderDataDialog: React.FC<OrderDataDialog> = ({ children }) => {

    return (
        <Dialog.Root>
            <Dialog.Trigger className="w-full">
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/40 inset-0 fixed z-0 h-screen w-screen' />
                <Dialog.Content className='fixed top-1/2 left-1/2 overflow-scroll -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[600px] bg-white flex flex-col p-8 rounded-lg gap-4'>
                    <div className="flex justify-between mb-4 items-center">
                        <Dialog.Title className='text-xl lg:text-2xl font-semibold'>Editar dados do pedido</Dialog.Title>
                        <Dialog.Close>
                            <X size={32} className="text-gray-800" />
                        </Dialog.Close>
                    </div>

                    <span>Produtos</span>
                    <div className="hidden lg:grid grid-cols-4 text-sm">
                        <span>Id</span>
                        <span>Título</span>
                        <span>Preço</span>
                        <span>Quantidade</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <OrderProductToShow />
                        <OrderProductToShow />
                    </div>

                    <span>Cliente: Tomaz Cantarelli Xavier</span>
                    <span>Total: R$40,00</span>

                    <span className='text-lg'>Dados para atualizar</span>

                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                        <Input name="id_cliente" id="id_cliente" placeholder="Id do cliente" type="number" ><IdentificationCard className="text-gray-500" size={24} /></Input>
                        <Input name="data" id="data" type="date" placeholder="Data" ><Calendar className="text-gray-500" size={24} /></Input>
                        <SelectStatus />
                        <Input name="status" id="status" type="text" placeholder="status" ><Notebook className="text-gray-500" size={24} /></Input>
                        <Input name="desconto" id="desconto" type="text" placeholder="Desconto (em porcentagem)" ><CurrencyDollarSimple className="text-gray-500" size={24} /></Input>
                        <div className="flex gap-4">
                            <DeleteItemAlert entityToDelete='pedido' id={1} button={<Button text="Deletar" buttonType={BUTTON_TYPE.RED} />
                            } />
                            <Button text="Salvar" />
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>

    )

}