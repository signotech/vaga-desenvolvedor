import {
  Icon,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  Input as ChakraInput,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface InputProps extends ChakraInputProps {
  icon?: IconType
}

export function Input({ icon, ...props }: InputProps) {
  return (
    <InputGroup h="100%">
      {icon && (
        <InputLeftElement pointerEvents="none" h="100%">
          <Icon as={icon} />
        </InputLeftElement>
      )}
      <ChakraInput
        variant="filled"
        fontWeight={600}
        fontSize={18}
        h={['auto', '100%', '100%']}
        color="blue.800"
        boxShadow="base"
        {...props}
        _focus={{
          border: '2px',
          borderColor: 'blue.400',
        }}
      />
    </InputGroup>
  )
}
