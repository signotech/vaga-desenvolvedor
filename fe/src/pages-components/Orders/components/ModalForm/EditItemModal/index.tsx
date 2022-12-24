import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react'

import { Modal } from 'components/Modal'
import { OrderContext } from 'pages-components/Orders'
import { useContext } from 'react'

import { useForm } from 'react-hook-form'
import { api } from 'services/api'
import { IOrder } from '../../../../../../@types/Order'

const statusList = ['Aberto', 'Pago', 'Cancelado']

interface EditItemModalProps {
  isEditModalOpen: boolean
  onClose: () => void
  items: IOrder
}

interface EditProductFormData {
  id: string
  status: string
  name: string
  product: string
}

export function EditItemModal({
  isEditModalOpen,
  onClose,
  items,
}: EditItemModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<EditProductFormData>()
  const { updateOrder } = useContext(OrderContext)

  const toast = useToast({ position: 'top' })

  setValue('name', items.name)
  setValue('status', items.status)
  setValue('product', items.product)

  async function handleEditStatusOrder(data: EditProductFormData) {
    try {
      if (!data.status) {
        toast({
          status: 'error',
          title: 'Preencha os campos necessários',
          isClosable: true,
        })
        return
      }
      toast({
        status: 'loading',
        isClosable: true,
        title: 'Adicionando Item',
      })

      const response = await api.patch(`/orders/${items.id}`, data)
      updateOrder(response.data)

      toast.closeAll()

      toast({
        status: 'success',
        isClosable: true,
        title: 'Status do Pedido Atualizado.',
      })

      onClose()
      reset()
    } catch (error: any) {
      console.log(error)
      toast({
        status: 'error',
        title: error.response.data.message,
        isClosable: true,
      })
    }
  }

  return (
    <Modal
      isOpen={isEditModalOpen}
      onClose={onClose}
      title="Adicionar Produto"
      size="2xl"
    >
      <FormControl
        onSubmit={handleSubmit(handleEditStatusOrder)}
        as="form"
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input placeholder="Nome" disabled />
        </FormControl>

        <FormControl>
          <FormLabel>Produto</FormLabel>
          <Input placeholder="Nome" disabled />
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select placeholder="Selecione uma status" {...register('status')}>
            {statusList.map((status) => (
              <option key={`status-select-list-${status}`}>{status}</option>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          bg="blue.400"
          color="white"
          _hover={{ bg: 'blue.500' }}
          _active={{ bg: 'blue.300' }}
          isLoading={isSubmitting}
          loadingText="Adicionando"
        >
          Adicionar
        </Button>
      </FormControl>
    </Modal>
  )
}
