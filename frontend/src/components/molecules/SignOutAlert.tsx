import { BUTTON_TYPE, Button } from '@components/atoms/Button'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { SignOut } from 'phosphor-react'

type SignOutAlert = {
    button: React.ReactNode
}

export const SignOutAlert: React.FC<SignOutAlert> = ({button}) => {

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                {button}
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className='bg-black/40 inset-0 fixed z-0 h-screen w-screen' />
                <AlertDialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[600px] bg-white flex flex-col p-8 rounded-lg'>
                    <AlertDialog.Title className='text-xl lg:text-2xl font-semibold mb-4'>Deseja mesmo sair?</AlertDialog.Title>
                    <AlertDialog.Description className='mb-8 text-sm lg:text-md'>Ao clicar em confirmar, você será redirecionado para tela de login onde você deverá se autenticar novamente.</AlertDialog.Description>
                    <div className='flex flex-col lg:flex-row gap-4'>
                        <AlertDialog.Cancel className='w-full'>
                            <Button text='Cancelar' buttonType={BUTTON_TYPE.RED} />
                        </AlertDialog.Cancel>
                        <AlertDialog.Action className='w-full'>
                            <Button text='Confirmar' />
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>

        </AlertDialog.Root>

    )

}