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
        <InputGroup flexDir="column" gap={2}>
          <Text>Nome</Text>
          <Input placeholder="Nome" {...register('name')} />
        </InputGroup>

        <InputGroup flexDir="column" gap={2}>
          <Text>Categoria</Text>
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
          <Text>Quantidade</Text>
          <NumberInput defaultValue={1} placeholder="Quantidade" min={1}>
            <NumberInputField {...register('stock', { valueAsNumber: true })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>

        <InputGroup flexDir="column" gap={2}>
          <Text>Preço da unidade</Text>
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
