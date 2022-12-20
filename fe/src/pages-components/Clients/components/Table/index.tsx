import { TableContainer, Flex, Icon, Spinner, Button } from '@chakra-ui/react'
import { ClientContext } from 'pages-components/Clients'
import { useCallback, useContext, useMemo, useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { IClient } from '../../../../../@types/Client'
import { DeleteItemModal } from '../ModalForm/DeleteItemModal'
import { EditItemModal } from '../ModalForm/EditItemModal'
import { Table as TablePagination } from 'react-chakra-pagination'

export function Table() {
  const { clients, orderBy, searchContent, isLoading } =
    useContext(ClientContext)
  const [id, setId] = useState('')
  const [items, setItems] = useState({} as IClient)
  const [isDeleteItemModal, setIsDeleteItemModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [page, setPage] = useState(1)

  const filteredBySort = useMemo(
    () =>
      clients.sort((a: any, b: any) => {
        if (a[orderBy] < b[orderBy]) {
          return -1
        }
        if (b[orderBy] < a[orderBy]) {
          return 1
        }
        return 0
      }),
    [orderBy, clients],
  )

  const filteredBySearch = useMemo(
    () =>
      filteredBySort.filter((item) => {
        const itemsArr = Object.values(item).join('').toLowerCase()
        if (itemsArr.includes(searchContent.toLowerCase())) {
          return true
        }
        return false
      }),
    [filteredBySort, searchContent],
  )

  function handleCloseModal() {
    setIsDeleteItemModalOpen(false)
    setIsEditModalOpen(false)
  }

  const handleOpenEditModal = useCallback((items: IClient) => {
    setItems(items)
    setIsEditModalOpen(true)
  }, [])

  const handleOpenDeleteItemModal = useCallback((itemId: string) => {
    console.log(itemId)
    setId(itemId)
    setIsDeleteItemModalOpen(true)
  }, [])

  const tableData = filteredBySearch.map((item) => ({
    name: item.name,
    email: item.email,
    cpf: item.cpf,
    action: (
      <Flex gap={2} align="center" color="blue.800">
        <Button
          colorScheme="gray"
          onClick={() => handleOpenEditModal({ ...item })}
          size="sm"
        >
          <Icon as={FiEdit2} fontSize="20" />
        </Button>
        <Button
          colorScheme="gray"
          onClick={() => handleOpenDeleteItemModal(item.id)}
          size="sm"
        >
          <Icon as={FiTrash2} fontSize="20" />
        </Button>
      </Flex>
    ),
  }))

  const tableColumns = [
    {
      Header: 'Nome',
      accessor: 'name' as const,
    },
    {
      Header: 'E-mail',
      accessor: 'email' as const,
    },
    {
      Header: 'CPF',
      accessor: 'cpf' as const,
    },
    {
      Header: '',
      accessor: 'action' as const,
    },
  ]

  return (
    <>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <TableContainer>
          <TablePagination
            colorScheme="blue"
            totalRegisters={filteredBySearch.length}
            page={page}
            emptyData={{
              text: 'Nao existe Clientes cadastrados.',
            }}
            onPageChange={(page) => setPage(page)}
            columns={tableColumns}
            data={tableData}
          />
        </TableContainer>
      )}

      <DeleteItemModal
        id={id}
        isOpen={isDeleteItemModal}
        onClose={handleCloseModal}
      />

      <EditItemModal
        items={items}
        isEditModalOpen={isEditModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
