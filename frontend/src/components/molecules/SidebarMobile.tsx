import { MobileSidebarButton } from '@components/atoms/MobileSidebarButton'
import * as Dialog from '@radix-ui/react-dialog'
import { List, X } from 'phosphor-react'
import { SignOutAlert } from './SignOutAlert'

export const SidebarMobile = () => {

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <List className='text-white cursor-pointer hover:text-gray-200 transition-colors' size={32} />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/40 w-screen h-screen z-0' />
                <Dialog.Content className='h-screen w-[50vw] fixed top-0 right-0 bg-gray-200 flex p-4 flex-col z-100 gap-12'>
                    <Dialog.Close>
                        <X size={24} /> 
                    </Dialog.Close>

                    <div className="flex flex-col gap-4">
                        <MobileSidebarButton text='Home' href={'/'} />
                        <MobileSidebarButton text='Clientes' href={'/clients'} />
                        <MobileSidebarButton text='Produtos' href={'/products'} />
                        <MobileSidebarButton text='Pedidos' href={'/orders'} />
                        <SignOutAlert button={
                             <div className='w-full border-b border-black pb-2 hover:bg-gray-300 transition-colors text-left'>Sair</div>
                        } />
                    </div>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>
    )

}