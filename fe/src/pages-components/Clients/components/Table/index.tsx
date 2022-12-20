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
import { ClientContext } from 'pages-components/Clients'
import { useCallback, useContext, useMemo, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { IClient } from '../../../../../@types/Client'
import { DeleteItemModal } from '../ModalForm/DeleteItemModal'
import { EditItemModal } from '../ModalForm/EditItemModal'

const stockColumns = [
  { text: 'Nome', prop: 'name' },
  { text: 'E-mail', prop: 'email' },
  { text: 'CPF', prop: 'cpf' },
]

export function Table() {
  const { clients, orderBy, isLoading, searchContent } =
    useContext(ClientContext)
  const [id, setId] = useState('')
  const [items, setItems] = useState({} as IClient)
  const [isDeleteItemModal, setIsDeleteItemModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

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
              {filteredBySearch?.map((item) => {
                return (
                  <Tr
                    key={item.id}
                    cursor="pointer"
                    _hover={{
                      bg: 'blue.50',
                    }}
                  >
                    <Td>{item.name}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.cpf}</Td>
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
