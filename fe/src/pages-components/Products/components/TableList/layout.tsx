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
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

import { IProduct } from '../../../../../@types/Product'

import { formatMoney } from 'utils/formatMoney'
import { Pagination } from 'components/Pagination'
import { NoContent } from 'components/NoContent'
import { MdInventory2 } from 'react-icons/md'

const tableColumns = [
  { text: 'Código P.', prop: 'sku' },
  { text: 'Nome', prop: 'name' },
  { text: 'Categoria', prop: 'category' },
  { text: 'Quantidade', prop: 'stock' },
  { text: 'Preço unid.', prop: 'unitPrice' },
]

interface TableLayoutProps {
  itemsTotal: number
  pageAtual: number
  pageTotal: number
  isLoading: boolean
  items: IProduct[]
  onOpenEdit: (items: IProduct) => void
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
            <NoContent
              icon={MdInventory2}
              text="Não existe produtos cadastrados"
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
                      <Td>{item.sku}</Td>
                      <Td>{item.name}</Td>
                      <Td>{item.category}</Td>
                      <Td>{item.stock}</Td>
                      <Td>{formatMoney(Number(item.unitPrice))}</Td>
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
