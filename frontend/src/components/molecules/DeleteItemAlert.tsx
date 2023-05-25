import { BUTTON_TYPE, Button } from '@components/atoms/Button'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { api } from '@utils/api'
import { useRouter } from 'next/navigation'

type DeleteItemAlert = {
    button: React.ReactNode,
    entityToDelete: string,
    id: number,
    endpoint: string,
}

export const DeleteItemAlert: React.FC<DeleteItemAlert> = ({ button, entityToDelete, id, endpoint }) => {

    const router = useRouter()

    const handleDelete = async () => {
        try {
            await api.delete(endpoint)
            router.push('/')
        }catch(err:any){
            alert(err.response.data.message)
        }
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger className='w-full'>{button}</AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className='bg-black/40 inset-0 fixed z-0 h-screen w-screen' />
                <AlertDialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[600px] bg-white flex flex-col p-8 rounded-lg'>
                    <AlertDialog.Title className='text-xl lg:text-2xl font-semibold mb-4'>Deseja mesmo deletar o {entityToDelete} de id {id}?</AlertDialog.Title>
                    <AlertDialog.Description className='mb-8 text-sm lg:text-md'>Ao clicar em confirmar, o {entityToDelete} sera deletado do banco de dados. Essa ação é irreversível.</AlertDialog.Description>
                    <div className='flex flex-col lg:flex-row gap-4'>
                        <AlertDialog.Cancel className='w-full'>
                            <Button text='Cancelar' buttonType={BUTTON_TYPE.GRAY} />
                        </AlertDialog.Cancel>
                        <AlertDialog.Action className='w-full' >
                            <Button text='Confirmar' onClick={() => handleDelete()} buttonType={BUTTON_TYPE.RED} />
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>


            </AlertDialog.Portal>
        </AlertDialog.Root>

    )

}