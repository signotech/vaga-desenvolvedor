import { TableContainer, Flex, Icon, Spinner, Button } from '@chakra-ui/react'
import { OrderContext } from 'pages-components/Orders'
import { useCallback, useContext, useMemo, useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { formatMoney } from 'utils/formatMoney'
import { IOrder } from '../../../../../@types/Order'
import { DeleteItemModal } from '../ModalForm/DeleteItemModal'
import { EditItemModal } from '../ModalForm/EditItemModal'

import { Table as TablePagination } from 'react-chakra-pagination'

export function Table() {
  const { orders, filter, orderBy, isLoading, searchContent } =
    useContext(OrderContext)
  const [id, setId] = useState('')
  const [items, setItems] = useState({} as IOrder)
  const [isDeleteItemModal, setIsDeleteItemModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [page, setPage] = useState(1)

  const filteredByFilter = useMemo(() => {
    if (filter) {
      const filtered = orders.filter(({ status }) => status === filter)
      return filtered
    }

    return orders
  }, [filter, orders])

  const filteredBySort = useMemo(
    () =>
      filteredByFilter.sort((a: any, b: any) => {
        if (a[orderBy] < b[orderBy]) {
          return -1
        }
        if (b[orderBy] < a[orderBy]) {
          return 1
        }
        return 0
      }),
    [orderBy, filteredByFilter],
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

  const handleOpenEditModal = useCallback((items: IOrder) => {
    setItems(items)
    setIsEditModalOpen(true)
  }, [])

  const handleOpenDeleteItemModal = useCallback((itemId: string) => {
    setId(itemId)
    setIsDeleteItemModalOpen(true)
  }, [])

  const tableData = filteredBySearch.map((item) => ({
    code: String(item.code_order),
    product: item.product,
    client: item.name,
    quantity: String(item.quantity),
    status: item.status,
    price: formatMoney(item.totalPrice),
    date: new Date(item.date).toLocaleDateString('pt-BR'),
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
      Header: 'Código P.',
      accessor: 'code' as const,
    },
    {
      Header: 'Produto',
      accessor: 'product' as const,
    },
    {
      Header: 'Cliente',
      accessor: 'client' as const,
    },
    {
      Header: 'Quantidade',
      accessor: 'quantity' as const,
    },
    {
      Header: 'Status',
      accessor: 'status' as const,
    },
    {
      Header: 'Valor Total',
      accessor: 'price' as const,
    },
    {
      Header: 'Data',
      accessor: 'date' as const,
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
              text: 'Nao existe Pedidos cadastrados.',
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
