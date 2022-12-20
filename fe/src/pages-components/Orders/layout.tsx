import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { Header } from '../../components/Header'
import { Heading, Icon, useDisclosure } from '@chakra-ui/react'

import { Table } from './components/Table'
import { Button } from '../../components/Button'
import { MdOutlineAddBox } from 'react-icons/md'
import { AddItemModal } from './components/ModalForm/AddItemModal'
import { NavHeader } from './components/NavHeader'

export function OrdersLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Head>
        <title>Pedidos - Seu sistema completo</title>
      </Head>

      <Layout>
        <Header>
          <Button isCallAction onClick={onOpen}>
            <Icon as={MdOutlineAddBox} />
            Adicionar Pedido
          </Button>
        </Header>

        <Heading mb={8} color="blue.800" fontSize={[16, 20, 24, 32]}>
          Cadastro de Pedidos
        </Heading>

        <NavHeader />

        <Table />
      </Layout>

      <AddItemModal
        isAddItemModalOpen={isOpen}
        setIsAddItemModalOpen={onClose}
      />
    </>
  )
}
