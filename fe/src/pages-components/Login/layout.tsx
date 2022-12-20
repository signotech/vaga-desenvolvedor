import {
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  Input,
  Text,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  showPassword: boolean
  setShowPassword: Dispatch<SetStateAction<boolean>>
  handleLogin: any
  accessKey: string
  setAccessKey: Dispatch<SetStateAction<string>>
  sendedLoginRequest: boolean
}

export const LoginLayout = ({
  setShowPassword,
  showPassword,
  handleLogin,
  accessKey,
  setAccessKey,
  sendedLoginRequest,
}: Props) => (
  <Flex
    justify="center"
    align="center"
    flexDirection="column"
    p={2}
    gap={8}
    w="100%"
    minHeight="100vh"
    bg="gray.100"
  >
    <Center>
      <Text as={'h2'} fontSize="4xl" fontWeight="medium">
        Teste SignoWeb
      </Text>
    </Center>
    <FormControl
      as="form"
      onSubmit={(e: any) => handleLogin(e)}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      gap={4}
      backgroundColor="blue.100"
      width="100%"
      maxWidth="500px"
      p={8}
      rounded={8}
    >
      <Input
        placeholder="Chave De Acesso"
        type={showPassword ? 'text' : 'password'}
        value={accessKey}
        onChange={(e) => setAccessKey(e.target.value)}
        bg="gray.100"
        fontSize={['md', 'lg', 'xl']}
        h={16}
        fontWeight={600}
      />
      <Checkbox
        mb={2}
        color="blue.600"
        fontWeight={500}
        onChange={(e) => setShowPassword(e.target.checked)}
      >
        Mostrar Chave
      </Checkbox>
      <Button
        type="submit"
        h={16}
        bg="blue.500"
        color="gray.100"
        fontSize={['md', 'lg', 'xl']}
        fontWeight={700}
        isLoading={sendedLoginRequest}
        loadingText="Logando"
        _hover={{
          backgroundColor: 'blue.400',
        }}
      >
        Acessar
      </Button>
    </FormControl>
  </Flex>
)
