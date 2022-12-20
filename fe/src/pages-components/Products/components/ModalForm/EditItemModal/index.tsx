/* eslint-disable react/no-children-prop */
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
  Text,
  useToast,
} from '@chakra-ui/react'

import { Modal } from 'components/Modal'
import { ProductContext } from 'pages-components/Products'
import { useContext } from 'react'

import { useForm } from 'react-hook-form'
import { api } from 'services/api'
import { IProduct } from '../../../../../../@types/Product'

const categories = ['Moda', 'Tecnologia', 'Veículos']

interface EditItemModalProps {
  isEditModalOpen: boolean
  onClose: () => void
  items: IProduct
}

interface EditProductFormData {
  name: string
  category: string
  stock: number
  unitPrice: string
  sku: string
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
  const toast = useToast({ position: 'top' })
  const { dispatch } = useContext(ProductContext)

  setValue('name', items.name)
  setValue('category', items.category)
  setValue('stock', items.stock)
  setValue('unitPrice', items.unitPrice)

  async function handleEditProduct(data: EditProductFormData) {
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

      await api.put(`/products/${items.id}`, data)
      toast.closeAll()

      toast({
        status: 'success',
        isClosable: true,
        title: 'Produto Editado.',
      })

      onClose()

      dispatch({
        type: 'UPDATE-ONE-PRODUCT',
        payload: { ...data, id: items.id },
      })

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
        onSubmit={handleSubmit(handleEditProduct)}
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
