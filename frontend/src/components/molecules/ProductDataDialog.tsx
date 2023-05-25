import { BUTTON_TYPE, Button } from '@components/atoms/Button'
import { Input } from '@components/atoms/Input'
import * as Dialog from '@radix-ui/react-dialog'
import { CurrencyDollarSimple, IdentificationCard, Package, ShoppingBag, X } from 'phosphor-react'
import { DeleteItemAlert } from './DeleteItemAlert'

type ProductDataDialog = {
    children: React.ReactNode
}

export const ProductDataDialog: React.FC<ProductDataDialog> = ({ children }) => {

    return (
        <Dialog.Root>
            <Dialog.Trigger className="w-full">
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/40 inset-0 fixed z-0 h-screen w-screen' />
                <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[600px] bg-white flex flex-col p-8 rounded-lg'>
                    <div className="flex justify-between mb-4 items-center">
                        <Dialog.Title className='text-xl lg:text-2xl font-semibold'>Editar dados do produto</Dialog.Title>
                        <Dialog.Close>
                            <X size={32} className="text-gray-800" />
                        </Dialog.Close>
                    </div>
                    <Dialog.Description className='mb-8 text-sm lg:text-md'>Dados do produto cadastrado.</Dialog.Description>
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                        <Input name="titulo" id="titulo" placeholder="Título" type="text" ><ShoppingBag className="text-gray-500" size={24} /></Input>
                        <Input name="sku" id="sku" type="text" placeholder="SKU" ><IdentificationCard className="text-gray-500" size={24} /></Input>
                        <Input name="preco" id="preco" type="text" placeholder="Preço" ><CurrencyDollarSimple className="text-gray-500" size={24} /></Input>
                        <Input name="estoque" id="estoque" type="text" placeholder="Preço" ><Package className="text-gray-500" size={24} /></Input>

                        <div className="flex gap-4">
                            <DeleteItemAlert entityToDelete='produto' id={1} button={<Button text="Deletar" buttonType={BUTTON_TYPE.RED} />
} />                            
                            <Button text="Salvar" />
                        </div>

                    </form>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>

    )

}