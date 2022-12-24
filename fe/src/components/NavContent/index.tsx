import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface NavContentProps {
  children: ReactNode
}

export function NavContent({ children }: NavContentProps) {
  return (
    <Flex
      justify="space-between"
      align={'center'}
      gap={4}
      h={50}
      flexWrap={['wrap', 'wrap', 'nowrap']}
      display={['flex', 'grid', 'flex']}
      gridTemplateColumns={[null, 'repeat(2, 1fr)', null]}
    >
      {children}
    </Flex>
  )
}
