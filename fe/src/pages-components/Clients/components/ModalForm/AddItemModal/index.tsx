import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'

import InputMask from 'react-input-mask'

import { Modal } from 'components/Modal'
import { ClientContext } from 'pages-components/Clients'
import { Dispatch, SetStateAction, useCallback, useContext } from 'react'

import { useForm } from 'react-hook-form'
import { api } from 'services/api'

interface AddItemModalProps {
  isAddItemModalOpen: boolean
  setIsAddItemModalOpen: Dispatch<SetStateAction<boolean>>
}

interface NewClientFormData {
  name: string
  email: string
  cpf: string
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

  const { createNewClient } = useContext(ClientContext)

  const toast = useToast({ position: 'top' })

  const handleCloseModal = useCallback(() => {
    setIsAddItemModalOpen(false)
  }, [setIsAddItemModalOpen])

  async function handleCreateNewProduct(data: NewClientFormData) {
    try {
      if (!data.cpf || !data.email || !data.name) {
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

      const response = await api.post('/clients', data)

      createNewClient(response.data)

      toast.closeAll()
      toast({
        status: 'success',
        title: 'Cliente Adicionado.',
      })

      reset()
      handleCloseModal()
    } catch (error: any) {
      console.error(error)
      toast.closeAll()
      toast({
        status: 'error',
        title: error.response.data.message,
      })
    }
  }

  return (
    <Modal
      isOpen={isAddItemModalOpen}
      onClose={handleCloseModal}
      title="Adicionar Clientes"
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
          <FormLabel>Nome</FormLabel>
          <Input placeholder="Jonas Martins" {...register('name')} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="email"
            placeholder="email@email.com"
            {...register('email')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>CPF</FormLabel>
          <Input
            as={InputMask}
            mask="***.***.***-**"
            placeholder="000.000.000-00"
            max={15}
            {...register('cpf')}
          />
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
