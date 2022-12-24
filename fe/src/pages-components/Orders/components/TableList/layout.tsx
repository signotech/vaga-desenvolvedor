import {
  Box,
  Button,
  Flex,
  Icon,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TableContainer,
} from '@chakra-ui/react'
import { NoContent } from 'components/NoContent'
import { GiCook } from 'react-icons/gi'

import { Pagination } from 'components/Pagination'

import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { formatMoney } from 'utils/formatMoney'

import { IOrder } from '../../../../../@types/Order'

const tableColumns = [
  { text: 'Código P.', prop: 'code' },
  { text: 'Produto', prop: 'product' },
  { text: 'Cliente', prop: 'name' },
  { text: 'Quantidade', prop: 'quantity' },
  { text: 'Status', prop: 'status' },
  { text: 'Valor Total', prop: 'totalPrice' },
]

interface TableLayoutProps {
  isLoading: boolean
  items: IOrder[]
  itemsTotal: number
  pageAtual: number
  pageTotal: number
  onOpenEdit: (items: IOrder) => void
  onOpenDelete: (itemId: string) => void
  onNextPage: () => void
  onPrevPage: () => void
}

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
            <NoContent icon={GiCook} text="Não existe pedidos cadastrados" />
          ) : (
            <TableContainer>
              <Table variant="simple">
                <Thead bg="gray.100">
                  <Tr>
                    {tableColumns.map((item) => (
                      <Th key={`header-${item.prop}`}>{item.text}</Th>
                    ))}
                    <Td>Ações</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {items.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.code_order}</Td>
                      <Td>{item.product}</Td>
                      <Td>{item.name}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>{item.status}</Td>
                      <Td>{formatMoney(Number(item.totalPrice))}</Td>
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
