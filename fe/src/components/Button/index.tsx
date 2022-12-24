import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react'

interface ButtonProps extends ChakraButtonProps {
  isCallAction?: boolean
}

export function Button({ isCallAction = false, ...props }: ButtonProps) {
  return (
    <ChakraButton
      {...props}
      alignItems="center"
      gap={[1, 1, 2]}
      bg={isCallAction ? 'blue.400' : 'blue.50'}
      color={isCallAction ? 'blue.50' : 'blue.800'}
      boxShadow="base"
      fontSize={['sm', 'md', 'lg']}
      fontWeight={600}
      p={[2, 4, 6]}
      _hover={{
        bg: isCallAction ? 'blue.500' : 'blue.200',
        color: isCallAction ? 'blue.50' : 'blue.700',
      }}
      _active={{
        bg: isCallAction ? 'blue.400' : 'blue.50',
        color: isCallAction ? 'blue.50' : 'blue.700',
      }}
    >
      {props.children}
    </ChakraButton>
  )
}
