import { BUTTON_TYPE, Button } from '@components/atoms/Button'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { api } from '@utils/api'
import { useRouter } from 'next/navigation'

type DeleteAllAlert = {
    button: React.ReactNode,
    entityToDelete:string,
    endpointApi:string,
    refetch: () => void
}

export const DeleteAllAlert:React.FC<DeleteAllAlert> = ({button, entityToDelete, endpointApi, refetch}) => {

    const router = useRouter()

    const deleteRequest = async() => {
        try{
            await api.delete(endpointApi)
            refetch()
        }catch(err){
            alert(err)
            router.push('/sign-in') 
        }
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger className='w-full'>{button}</AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className='bg-black/40 inset-0 fixed z-0 h-screen w-screen' />
                <AlertDialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[600px] bg-white flex flex-col p-8 rounded-lg'>
                    <AlertDialog.Title className='text-xl lg:text-2xl font-semibold mb-4'>Deseja mesmo deletar todos os {entityToDelete}?</AlertDialog.Title>
                    <AlertDialog.Description className='mb-8 text-sm lg:text-md'>Ao clicar em confirmar, todos os {entityToDelete} serão deletados do banco de dados. Essa ação é irreversível.</AlertDialog.Description>
                    <div className='flex flex-col lg:flex-row gap-4'>
                        <AlertDialog.Cancel className='w-full'>
                            <Button text='Cancelar' buttonType={BUTTON_TYPE.GRAY} />
                        </AlertDialog.Cancel>
                        <AlertDialog.Action className='w-full'>
                            <Button text='Confirmar' buttonType={BUTTON_TYPE.RED} onClick={() => deleteRequest()} />
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>


            </AlertDialog.Portal>
        </AlertDialog.Root>

    )

}