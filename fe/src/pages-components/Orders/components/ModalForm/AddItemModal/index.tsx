import {
  Button,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  useToast,
} from '@chakra-ui/react'

import { Modal } from 'components/Modal'
import { OrderContext } from 'pages-components/Orders'
import { ProductContext } from 'pages-components/Products'
import { useContext, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { api } from 'services/api'
import { IClient } from '../../../../../../@types/Client'
import { IProduct } from '../../../../../../@types/Product'

interface AddItemModalProps {
  isAddItemModalOpen: boolean
  setIsAddItemModalOpen: () => void
}

interface NewClientFormData {
  productsId: string
  clientsId: string
  quantity: number
}

export function AddItemModal({
  isAddItemModalOpen,
  setIsAddItemModalOpen,
}: AddItemModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewClientFormData>()
  const [products, setProducts] = useState<IProduct[]>([])
  const [clients, setClients] = useState<IClient[]>([])
  const toast = useToast({ position: 'top' })
  const { dispatch } = useContext(OrderContext)

  useEffect(() => {
    ;(async () => {
      const allProducts = await api.get('/products')
      const allClients = await api.get('/clients')
      setProducts(allProducts.data)
      setClients(allClients.data)
    })()
  }, [])

  async function handleCreateNewOrder(data: NewClientFormData) {
    try {
      if (!data.clientsId || !data.productsId || !data.quantity) {
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

      console.log(data)

      const response = await api.post('/orders', data)

      toast.closeAll()

      toast({
        status: 'success',
        title: 'Pedido Adicionado.',
      })

      dispatch({ type: 'ADD-ONE-ORDER', payload: response.data })

      reset()
      setIsAddItemModalOpen()
    } catch (error: any) {
      toast.closeAll()

      toast({
        status: 'error',
        title: error?.response.data.message,
      })
    }
  }

  return (
    <Modal
      isOpen={isAddItemModalOpen}
      onClose={setIsAddItemModalOpen}
      title="Adicionar Pedido"
      size="2xl"
    >
      <FormControl
        onSubmit={handleSubmit(handleCreateNewOrder)}
        as="form"
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <FormControl isRequired>
          <FormLabel>Cliente</FormLabel>

          <Select placeholder="Escolha..." {...register('clientsId')}>
            {clients.map((client) => (
              <option
                key={`categorie-select-list-${client.id}`}
                value={client.id}
              >
                {client.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Produto</FormLabel>
          <Select placeholder="Escolha..." {...register('productsId')}>
            {products.map((product) => (
              <option
                key={`categorie-select-list-${product.id}`}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Quantidade</FormLabel>
          <FormControl>
            <NumberInput defaultValue={1} placeholder="Quantidade" min={1}>
              <NumberInputField
                {...register('quantity', { valueAsNumber: true })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
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
