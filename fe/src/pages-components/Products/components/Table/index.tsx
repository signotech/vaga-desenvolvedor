import {
  TableContainer,
  Table as TableChakra,
  Tr,
  Th,
  Flex,
  Thead,
  Tbody,
  Td,
  Icon,
  Spinner,
  Stack,
  Skeleton,
} from '@chakra-ui/react'
import { ProductContext } from 'pages-components/Products'
import { useCallback, useContext, useMemo, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { formatMoney } from 'utils/formatMoney'
import { IProduct } from '../../../../../@types/Product'
import { DeleteItemModal } from '../ModalForm/DeleteItemModal'
import { EditItemModal } from '../ModalForm/EditItemModal'

const stockColumns = [
  { text: 'Código P.', prop: 'sku' },
  { text: 'Nome', prop: 'name' },
  { text: 'Categoria', prop: 'category' },
  { text: 'Quantidade', prop: 'amount' },
  { text: 'Preço unid.', prop: 'unitPrice' },
]

export function Table() {
  const { products, filter, orderBy, isLoading, searchContent } =
    useContext(ProductContext)
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

  return (
    <>
      <TableContainer>
        <TableChakra variant="simple">
          <Thead>
            <Tr>
              {stockColumns.map(({ text, prop }) => (
                <Th key={`header-${prop}`}>
                  <Flex align="center" gap={2}>
                    {text}
                  </Flex>
                </Th>
              ))}
            </Tr>
          </Thead>
          {isLoading ? (
            <Spinner size="xl" />
          ) : (
            <Tbody>
              {filteredBySearch.map((item) => {
                return (
                  <Tr
                    key={item.id}
                    cursor="pointer"
                    _hover={{
                      bg: 'blue.50',
                    }}
                  >
                    <Td>{item.sku}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.category}</Td>
                    <Td>{item.stock}</Td>
                    <Td>{formatMoney(Number(item.unitPrice))}</Td>
                    {/* Buttons */}
                    <Td>
                      <Flex gap={2} align="center" color="blue.800">
                        <Icon
                          as={FiEdit2}
                          fontSize={[16, 18]}
                          _hover={{ color: 'blue.500' }}
                          onClick={() => handleOpenEditModal({ ...item })}
                        />
                        <Icon
                          as={AiOutlineDelete}
                          fontSize={[20, 22]}
                          _hover={{ color: 'red.400' }}
                          onClick={() => handleOpenDeleteItemModal(item.id)}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          )}
        </TableChakra>
      </TableContainer>

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
