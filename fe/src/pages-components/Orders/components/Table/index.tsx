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
} from '@chakra-ui/react'
import moment from 'moment'
import { OrderContext } from 'pages-components/Orders'
import { useCallback, useContext, useMemo, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { formatMoney } from 'utils/formatMoney'
import { IOrder } from '../../../../../@types/Order'
import { DeleteItemModal } from '../ModalForm/DeleteItemModal'
import { EditItemModal } from '../ModalForm/EditItemModal'

const stockColumns = [
  { text: 'Código', prop: 'code' },
  { text: 'Produto', prop: 'product' },
  { text: 'Cliente', prop: 'client' },
  { text: 'Quantidade', prop: 'quantity' },
  { text: 'Status', prop: 'status' },
  { text: 'Valor Total', prop: 'status' },
  { text: 'Data', prop: 'date' },
]

export function Table() {
  const { orders, filter, orderBy, isLoading, searchContent } =
    useContext(OrderContext)
  const [id, setId] = useState('')
  const [items, setItems] = useState({} as IOrder)
  const [isDeleteItemModal, setIsDeleteItemModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

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

  return (
    <>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
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
                    <Td>{item.code_order}</Td>
                    <Td>{item.product}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{item.status}</Td>
                    <Td>{formatMoney(item.totalPrice)}</Td>
                    <Td>{moment(item.date).format('l')}</Td>
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
          </TableChakra>
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
