import { ChangeEvent, ReactNode, useContext, useState } from 'react'
import { BiSearchAlt2, BiSortAlt2 } from 'react-icons/bi'
import { AiFillFilter } from 'react-icons/ai'

import {
  Box,
  Divider,
  Flex,
  FlexProps,
  Icon,
  Text,
  TextProps,
} from '@chakra-ui/react'
import { Button } from 'components/Button'
import { OrderContext } from 'pages-components/Orders'
import { NavContent } from 'components/NavContent'
import { Input } from 'components/Input'

const statusOptions = ['Aberto', 'Pago', 'Cancelado']

export function NavHeader() {
  const { filter, setFilter, setPage, searchContent, setSearchContent } =
    useContext(OrderContext)

  const [whichMenuIsOpened, setWhichMenuIsOpened] = useState<
    'filter' | 'sort' | ''
  >('')

  function handleToggleFilterMenu() {
    setWhichMenuIsOpened((prevState) =>
      prevState === 'filter' ? '' : 'filter',
    )
  }

  function handleToggleSortMenu() {
    setWhichMenuIsOpened((prevState) => (prevState === 'sort' ? '' : 'sort'))
  }

  function handleSetFilter(prevFilter: string) {
    if (prevFilter === filter) {
      setFilter('')
      return
    }
    setFilter(prevFilter)
    handleToggleFilterMenu()
  }

  function handleSearchItems(e: ChangeEvent<HTMLInputElement>) {
    const existingSearchValue = e.target.value

    if (existingSearchValue.trim() !== '') {
      setPage(1)
    }
    setSearchContent(existingSearchValue)
  }

  return (
    <NavContent>
      <MenuBtnContainer>
        <Button h="100%" onClick={handleToggleFilterMenu}>
          <Icon as={AiFillFilter} fontSize={[12, 16, 18]} />
          Status
          {filter.length > 0 && <Circle />}
        </Button>
        {whichMenuIsOpened === 'filter' && (
          <MenuItemsContainer>
            {statusOptions.map((text) => (
              <ItemContainer
                onClick={() => handleSetFilter(text)}
                key={`filter#${text}`}
                bg={filter === text ? 'blue.200' : ''}
              >
                {text}
              </ItemContainer>
            ))}
          </MenuItemsContainer>
        )}
      </MenuBtnContainer>

      {/* Search */}

      <Input
        icon={BiSearchAlt2}
        placeholder="Pesquise por um item"
        onChange={(e) => handleSearchItems(e)}
        value={searchContent}
      />
    </NavContent>
  )
}

interface FlexContainerProps extends FlexProps {
  children: ReactNode
}

const MenuBtnContainer = (props: FlexContainerProps) => (
  <Flex {...props} direction="column" h={'100%'} position="relative">
    {props.children}
  </Flex>
)

const MenuItemsContainer = (props: FlexContainerProps) => (
  <Flex
    {...props}
    position="absolute"
    direction="column"
    gap={0.5}
    top="100%"
    width="100%"
    bg="blue.50"
    rounded="md"
    boxShadow="base"
    color="blue.800"
    mt={4}
    p={2}
    zIndex={100}
  >
    {props.children}
  </Flex>
)

interface ItemContainerProps extends TextProps {
  children: ReactNode
}

const ItemContainer = (props: ItemContainerProps) => (
  <>
    <Text
      {...props}
      p={1.5}
      rounded="md"
      fontWeight={600}
      cursor="pointer"
      _hover={{
        bg: 'blue.100',
      }}
    >
      {props.children}
    </Text>
    <Divider />
  </>
)

const Circle = () => <Box w={2} h={2} rounded={2} bg="blue.400" mt={1} />
