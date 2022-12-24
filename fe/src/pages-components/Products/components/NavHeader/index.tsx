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
import { ProductContext } from 'pages-components/Products'
import { Input } from 'components/Input'
import { NavContent } from 'components/NavContent'

const sortOptions = [
  { text: 'Nome', prop: 'name' },
  { text: 'Categoria', prop: 'category' },
  { text: 'Preço unid.', prop: 'unitPrice' },
  { text: 'Quantidade', prop: 'stock' },
]

const filterOptions = ['Tecnologia', 'Veículos', 'Moda']

export function NavHeader() {
  const {
    filter,
    orderBy,
    setFilter,
    setOrderBy,
    searchContent,
    setSearchContent,
    setPage,
  } = useContext(ProductContext)

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
    setFilter((prev) => (prev === prevFilter ? '' : prevFilter))
    handleToggleFilterMenu()
  }

  function handleOrderByFilter(order: string) {
    setOrderBy((prev) => (prev === order ? '' : order))
    handleToggleSortMenu()
  }

  function handleSearchItems(e: ChangeEvent<HTMLInputElement>) {
    setSearchContent(e.target.value)
    setPage(1)
  }

  return (
    <NavContent>
      <MenuBtnContainer>
        <Button h="100%" onClick={handleToggleFilterMenu}>
          <Icon as={AiFillFilter} fontSize={[12, 16, 18]} />
          Filtrar
          {filter.length > 0 && <Circle />}
        </Button>
        {whichMenuIsOpened === 'filter' && (
          <MenuItemsContainer>
            {filterOptions.map((text) => (
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

      <MenuBtnContainer>
        <Button h="100%" onClick={handleToggleSortMenu}>
          <Icon as={BiSortAlt2} fontSize={[16, 20, 24]} />
          Ordenar
          {orderBy.length > 0 && <Circle />}
        </Button>
        {whichMenuIsOpened === 'sort' && (
          <MenuItemsContainer>
            {sortOptions.map(({ text, prop }) => (
              <ItemContainer
                onClick={() => handleOrderByFilter(prop)}
                key={`sort#${prop}`}
                bg={prop === orderBy ? 'blue.200' : ''}
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
