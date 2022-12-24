import {
  Box,
  Button,
  Flex,
  Icon,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { NoContent } from 'components/NoContent'
import { Pagination } from 'components/Pagination'

import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { IoMdListBox } from 'react-icons/io'
import { IClient } from '../../../../../@types/Client'

interface TableLayoutProps {
  isLoading: boolean
  items: IClient[]
  itemsTotal: number
  pageAtual: number
  pageTotal: number
  onOpenEdit: (items: IClient) => void
  onOpenDelete: (itemId: string) => void
  onNextPage: () => void
  onPrevPage: () => void
}

const tableColumns = [
  { text: 'Nome', prop: 'name' },
  { text: 'E-mail', prop: 'email' },
  { text: 'CPF', prop: 'cpf' },
]

export function TableLayout({
  isLoading,
  items,
  onOpenEdit,
  onOpenDelete,
  onNextPage,
  onPrevPage,
  itemsTotal,
  pageAtual,
  pageTotal,
}: TableLayoutProps) {
  return (
    <>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Box p={2} mt={8}>
          {!items.length ? (
            <NoContent
              icon={IoMdListBox}
              text="Não existe clientes cadastrados"
            />
          ) : (
            <TableContainer>
              <Table variant="simple">
                <Thead bg="gray.100">
                  <Tr>
                    {tableColumns.map((item) => (
                      <Td key={`header-${item.prop}`}>{item.text}</Td>
                    ))}
                    <Td>Ações</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {items.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.name}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.cpf}</Td>
                      <Td>
                        <Flex gap={2}>
                          <Button onClick={() => onOpenEdit({ ...item })}>
                            <Icon as={FiEdit2} />
                          </Button>
                          <Button onClick={() => onOpenDelete(item.id)}>
                            <Icon as={FiTrash2} />
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}

          <Pagination
            itemsTotal={itemsTotal}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
            pageAtual={pageAtual}
            pageTotal={pageTotal}
          />
        </Box>
      )}
    </>
  )
}
