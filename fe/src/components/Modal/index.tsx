import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ModalProps extends ChakraModalProps {
  title: string
  children: ReactNode
}

export function Modal({ title, children, ...props }: ModalProps) {
  return (
    <ChakraModal scrollBehavior="inside" isCentered {...props}>
      <ModalOverlay />

      <ModalContent py={2} mx={2}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody display="flex" flexDir="column">
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}
