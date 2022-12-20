import { ReactNode, useContext, useState } from 'react'
import { BiSearchAlt2, BiSortAlt2 } from 'react-icons/bi'

import {
  Box,
  Divider,
  Flex,
  FlexProps,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  TextProps,
} from '@chakra-ui/react'
import { Button } from 'components/Button'
import { ClientContext } from 'pages-components/Clients'

const sortOptions = [
  { text: 'Nome', prop: 'name' },
  { text: 'Email', prop: 'email' },
  { text: 'CPF', prop: 'cpf' },
]

export function NavHeader() {
  const { orderBy, setOrderBy, searchContent, setSearchContent } =
    useContext(ClientContext)

  const [whichMenuIsOpened, setWhichMenuIsOpened] = useState<
    'filter' | 'sort' | ''
  >('')

  function handleToggleSortMenu() {
    setWhichMenuIsOpened((prevState) => (prevState === 'sort' ? '' : 'sort'))
  }

  function handleOrderByFilter(order: string) {
    if (order === orderBy) {
      setOrderBy('')
      return
    }
    setOrderBy(order)
    handleToggleSortMenu()
  }

  return (
    <Flex mb={8} w="100%">
      <Flex
        w="100%"
        justify="space-between"
        gap={4}
        height={['auto', 32, 14]}
        flexWrap={['wrap', 'wrap', 'nowrap']}
        display={['flex', 'grid', 'flex']}
        gridTemplateColumns={[null, 'repeat(2, 1fr)', null]}
      >
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
                >
                  {text}
                </ItemContainer>
              ))}
            </MenuItemsContainer>
          )}
        </MenuBtnContainer>

        {/* Search */}

        <InputGroup>
          <InputLeftElement pointerEvents="none" h="100%">
            <Icon as={BiSearchAlt2} />
          </InputLeftElement>
          <Input
            value={searchContent}
            variant="filled"
            placeholder="Pesquise por um item"
            fontWeight={600}
            fontSize={18}
            color="blue.800"
            boxShadow="base"
            h="100%"
            onChange={(e) => setSearchContent(e.target.value)}
            _focus={{
              border: '2px',
              borderColor: 'blue.400',
            }}
          />
        </InputGroup>
      </Flex>
    </Flex>
  )
}

interface FlexContainerProps extends FlexProps {
  children: ReactNode
}

const MenuBtnContainer = (props: FlexContainerProps) => (
  <Flex
    {...props}
    direction="column"
    w={['auto', 'auto', 200]}
    flex={[1, 1, 'auto']}
    h={[10, 12, 'auto']}
    position="relative"
  >
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
