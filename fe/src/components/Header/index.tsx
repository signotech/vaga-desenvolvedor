import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
} from '@chakra-ui/react'
import Image from 'next/image'

import { MdInventory2 } from 'react-icons/md'
import { GiCook } from 'react-icons/gi'
import { CgMenu } from 'react-icons/cg'
import { IoMdListBox } from 'react-icons/io'

import Logo from '../../assets/logo.svg'
import { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'

const headerButtons = [
  {
    text: 'Clientes',
    icon: IoMdListBox,
    path: '/clients',
  },
  {
    text: 'Pedidos',
    icon: GiCook,
    path: '/orders',
  },
  {
    text: 'Produtos',
    icon: MdInventory2,
    path: '/products',
  },
]

interface HeaderProps {
  children: ReactNode
}

export function Header({ children }: HeaderProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  const router = useRouter()

  function handleCloseSideMenu() {
    setIsSideMenuOpen(false)
  }

  function handleOpenSideMenu() {
    setIsSideMenuOpen(true)
  }

  return (
    <>
      <Flex
        as="aside"
        align="center"
        justify="space-between"
        gap={6}
        py={[4, 6, 8]}
        mb={[1, 2]}
        w="100%"
      >
        <Box
          position="relative"
          width={['calc(0.25 * 249px)', 'calc(249px * 0.5)']}
          height={['calc(0.25 * 75px)', 'calc(75px * 0.5)']}
        >
          <Image src={Logo} alt="logo" layout="fill" objectFit="contain" />
        </Box>

        <Flex gap={4} justify="center" align="center" h={[10, 12]}>
          {children}
          <Button
            onClick={handleOpenSideMenu}
            h="100%"
            bg="red.50"
            color="red.900"
            _hover={{
              bg: 'red.100',
              color: 'red.900',
            }}
            _active={{
              bg: 'red.50',
              color: 'red.800',
            }}
            boxShadow="base"
          >
            <Icon as={CgMenu} fontSize={['sm', 'md', 'lg', '3xl']} />
          </Button>
        </Flex>
      </Flex>

      <Drawer
        placement="right"
        isOpen={isSideMenuOpen}
        onClose={handleCloseSideMenu}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Flex flexDirection="column" gap={6} mt={[2, 4, 6]}>
              {headerButtons.map(({ text, icon: BtnIcon, path }) => (
                <Button
                  key={`header-btn-${path}`}
                  alignItems="center"
                  gap={[1, 1, 2]}
                  boxShadow="base"
                  fontSize={['sm', 'md', 'lg']}
                  fontWeight={600}
                  p={[2, 4, 6]}
                  justifyContent="space-between"
                  _hover={{
                    bg: 'blue.100',
                    color: 'blue.900',
                  }}
                  _active={{
                    bg: 'blue.100',
                    color: 'blue.800',
                  }}
                  h={[12, 14]}
                  w="100%"
                >
                  {text}
                  <Icon as={BtnIcon} />
                </Button>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
