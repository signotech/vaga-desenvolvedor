import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { Header } from '../../components/Header'
import { Heading, Icon, useDisclosure } from '@chakra-ui/react'

import { TableList } from './components/TableList'
import { Button } from '../../components/Button'
import { MdOutlineAddBox } from 'react-icons/md'
import { AddItemModal } from './components/ModalForm/AddItemModal'
import { NavHeader } from './components/NavHeader'
import { Dispatch, SetStateAction } from 'react'

interface ClientsLayoutProps {
  setIsAddItemModalOpen: Dispatch<SetStateAction<boolean>>
}

export function ClientsLayout({ setIsAddItemModalOpen }: ClientsLayoutProps) {
  return (
    <>
      <Head>
        <title>Pedidos - Seu sistema completo</title>
      </Head>

      <Layout>
        <Header>
          <Button isCallAction onClick={() => setIsAddItemModalOpen(true)}>
            <Icon as={MdOutlineAddBox} />
            Adicionar Clientes
          </Button>
        </Header>

        <Heading mb={8} color="blue.800" fontSize={[16, 20, 24, 32]}>
          Cadastro de Clientes
        </Heading>

        <NavHeader />

        <TableList />
      </Layout>
    </>
  )
}
