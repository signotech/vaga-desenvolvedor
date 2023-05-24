import { BUTTON_TYPE, Button } from '@components/atoms/Button'
import { Input } from '@components/atoms/Input'
import * as Dialog from '@radix-ui/react-dialog'
import { EnvelopeSimple, IdentificationCard, Person, X } from 'phosphor-react'
import { DeleteItemAlert } from './DeleteItemAlert'

type ClientDataDialog = {
    children: React.ReactNode
}

export const ClientDataDialog: React.FC<ClientDataDialog> = ({ children }) => {

    return (
        <Dialog.Root>
            <Dialog.Trigger className="w-full">
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/40 inset-0 fixed z-0 h-screen w-screen' />
                <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[600px] bg-white flex flex-col p-8 rounded-lg'>
                    <div className="flex justify-between mb-4 items-center">
                        <Dialog.Title className='text-xl lg:text-2xl font-semibold'>Editar dados do cliente</Dialog.Title>
                        <Dialog.Close>
                            <X size={32} className="text-gray-800" />
                        </Dialog.Close>
                    </div>
                    <Dialog.Description className='mb-8 text-sm lg:text-md'>Dados do cliente cadastrado.</Dialog.Description>
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                        <Input name="nome" id="nome" placeholder="Nome" defaultValue={"Tomaz Xavier"} type="text" ><Person className="text-wite" size={24} /></Input>
                        <Input name="email" id="email" type="email" placeholder="Email" defaultValue={"tomazcx06@gmail.com"} ><EnvelopeSimple className="text-wite" size={24} /></Input>
                        <Input name="cpf" id="cpf" type="text" placeholder="CPF" defaultValue={"09290448946"} ><IdentificationCard className="text-wite" size={24} /></Input>
                        <div className="flex gap-4">
                            <DeleteItemAlert entityToDelete='cliente' id={1} button={<Button text="Deletar" buttonType={BUTTON_TYPE.RED} />
} />                            
                            <Button text="Salvar" />
                        </div>

                    </form>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>

    )

}