/* eslint-disable react/no-children-prop */
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react'

import { Modal } from 'components/Modal'
import { ProductContext } from 'pages-components/Products'
import { useContext } from 'react'

import { useForm } from 'react-hook-form'
import { api } from 'services/api'

const categories = ['Moda', 'Tecnologia', 'Veículos']

interface AddItemModalProps {
  isAddItemModalOpen: boolean
  setIsAddItemModalOpen: () => void
}

interface NewProductFormData {
  name: string
  category: string
  stock: number
  unitPrice: string
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
  } = useForm<NewProductFormData>()
  const toast = useToast({ position: 'top' })
  const { dispatch } = useContext(ProductContext)

  async function handleCreateNewProduct(data: NewProductFormData) {
    try {
      if (!data.category || !data.name || !data.stock || !data.unitPrice) {
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
      const response = await api.post('/products', data)
      toast.closeAll()

      toast({
        status: 'success',
        title: 'Produto Adicionado.',
      })

      dispatch({ type: 'ADD-ONE-PRODUCT', payload: response.data })

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
      title="Adicionar Produto"
      size="2xl"
    >
      <FormControl
        onSubmit={handleSubmit(handleCreateNewProduct)}
        as="form"
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <InputGroup flexDir="column" gap={2}>
          <Text>Nome do produto *</Text>

          <Input placeholder="Digite nome do produto" {...register('name')} />
        </InputGroup>

        <InputGroup flexDir="column" gap={2}>
          <Text>Categoria *</Text>
          <Select
            placeholder="Selecione uma categoria"
            {...register('category')}
          >
            {categories.map((categorie) => (
              <option key={`categorie-select-list-${categorie}`}>
                {categorie}
              </option>
            ))}
          </Select>
        </InputGroup>
        <InputGroup flexDir="column" gap={2}>
          <Text>Quantidade *</Text>
          <NumberInput defaultValue={1} placeholder="Quantidade" min={1}>
            <NumberInputField {...register('stock', { valueAsNumber: true })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>

        <InputGroup flexDir="column" gap={2}>
          <Text>Preço da unidade *</Text>
          <InputGroup>
            <InputLeftElement children="R$" pointerEvents="none" />
            <Input
              placeholder="Preço da Unidade *"
              {...register('unitPrice')}
            />
          </InputGroup>
        </InputGroup>

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
