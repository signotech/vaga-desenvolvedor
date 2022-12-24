import { Box, Button, Flex, Stack } from '@chakra-ui/react'

interface PaginationProps {
  pageAtual: number
  itemsTotal: number
  pageTotal: number
  onNextPage: () => void
  onPrevPage: () => void
}

export function Pagination({
  pageAtual,
  itemsTotal,
  pageTotal,
  onNextPage,
  onPrevPage,
}: PaginationProps) {
  return (
    <Stack
      mt={10}
      flexDirection="row"
      justify={'space-between'}
      alignItems="center"
    >
      <Box>
        <strong>{pageAtual}</strong> - <strong>{pageTotal}</strong>{' '}
        <strong>de</strong>
        <strong> {itemsTotal} </strong>
      </Box>

      <Flex mt={8} gap={4} justify="flex-end">
        {pageAtual !== 1 && <Button onClick={onPrevPage}>Anterior</Button>}

        <Button
          colorScheme={'blue'}
          onClick={onNextPage}
          disabled={pageAtual === pageTotal || pageTotal === 0}
        >
          Próximo
        </Button>
      </Flex>
    </Stack>
  )
}
