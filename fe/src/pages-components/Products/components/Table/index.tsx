import { useCallback, useContext, useMemo, useState } from 'react'
import { TableContainer, Flex, Icon, Button, Spinner } from '@chakra-ui/react'

import { Table as TablePagination } from 'react-chakra-pagination'

import { ProductContext } from 'pages-components/Products'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { formatMoney } from 'utils/formatMoney'
import { IProduct } from '../../../../../@types/Product'
import { DeleteItemModal } from '../ModalForm/DeleteItemModal'
import { EditItemModal } from '../ModalForm/EditItemModal'

export function Table() {
  const { products, filter, orderBy, searchContent, isLoading } =
    useContext(ProductContext)
  const [page, setPage] = useState(1)
  const [id, setId] = useState('')
  const [items, setItems] = useState({} as IProduct)
  const [isDeleteItemModal, setIsDeleteItemModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const filteredByFilter = useMemo(() => {
    if (filter) {
      const filtered = products.filter(({ category }) => category === filter)
      return filtered
    }

    return products
  }, [filter, products])

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

  const handleOpenEditModal = useCallback((items: IProduct) => {
    setItems(items)
    setIsEditModalOpen(true)
  }, [])

  const handleOpenDeleteItemModal = useCallback((itemId: string) => {
    setId(itemId)
    setIsDeleteItemModalOpen(true)
  }, [])

  const tableData = filteredBySearch.map((item) => ({
    sku: item.sku,
    name: item.name,
    category: item.category,
    stock: String(item.stock),
    unitPrice: formatMoney(Number(item.unitPrice)),
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
      accessor: 'sku' as const,
    },
    {
      Header: 'Name',
      accessor: 'name' as const,
    },
    {
      Header: 'Categoria',
      accessor: 'category' as const,
    },
    {
      Header: 'Quantidade',
      accessor: 'stock' as const,
    },
    {
      Header: 'Preço',
      accessor: 'unitPrice' as const,
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
              text: 'Nao existe produtos cadastrados.',
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
