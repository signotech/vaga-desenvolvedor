import { Button } from "@components/atoms/Button"
import { Input } from "@components/atoms/Input"
import * as Dialog from "@radix-ui/react-dialog"
import { EnvelopeSimple, IdentificationCard, Person, X } from "phosphor-react"

export const CreateClientDialog = () => {

    return (
        <Dialog.Root>
            <Dialog.Trigger className="w-full">
                <Button text="Adicionar cliente" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/40 inset-0 fixed z-0 h-screen w-screen' />
                <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[600px] bg-white flex flex-col p-8 rounded-lg'>
                    <div className="flex justify-between mb-4 items-center">
                        <Dialog.Title className='text-xl lg:text-2xl font-semibold'>Adicionar cliente</Dialog.Title>
                        <Dialog.Close>
                            <X size={32} className="text-gray-800" />
                        </Dialog.Close>
                    </div>
                    <Dialog.Description className='mb-8 text-sm lg:text-md'>Preencha os campos do formulário para registrar um novo cliente.</Dialog.Description>
                    <form className="flex flex-col gap-4">
                        <Input name="nome" id="nome" placeholder="Nome" type="text" ><Person className="text-wite" size={24} /></Input>
                        <Input name="email" id="email" type="email" placeholder="Email" ><EnvelopeSimple className="text-wite" size={24} /></Input>
                        <Input name="cpf" id="cpf" type="text" placeholder="CPF" ><IdentificationCard className="text-wite" size={24} /></Input>
                        <Button text="Cadastrar" />
                    </form>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>

    )

}