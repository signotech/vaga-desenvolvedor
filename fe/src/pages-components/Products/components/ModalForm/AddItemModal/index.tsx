import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
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
  sku: string
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
  const { createNewProduct } = useContext(ProductContext)
  const toast = useToast({ position: 'top' })

  async function handleCreateNewProduct(data: NewProductFormData) {
    try {
      if (
        !data.category ||
        !data.name ||
        !data.stock ||
        !data.unitPrice ||
        !data.sku
      ) {
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
      createNewProduct(response.data)
      toast.closeAll()

      toast({
        status: 'success',
        title: 'Produto Adicionado.',
      })

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
        <FormControl isRequired>
          <FormLabel>Nome do produto</FormLabel>

          <Input placeholder="Digite nome do produto" {...register('name')} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Código do produto</FormLabel>

          <Input placeholder="Digite Código do produto" {...register('sku')} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Categoria</FormLabel>
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
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Quantidade </FormLabel>
          <NumberInput defaultValue={1} placeholder="Quantidade" min={1}>
            <NumberInputField {...register('stock', { valueAsNumber: true })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Preço da unidade</FormLabel>
          <InputGroup>
            <InputLeftElement children="R$" pointerEvents="none" />
            <Input
              placeholder="Preço da Unidade *"
              {...register('unitPrice')}
            />
          </InputGroup>
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
