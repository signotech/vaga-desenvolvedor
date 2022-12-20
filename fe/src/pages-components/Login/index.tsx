import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import { useState } from 'react'
import { api } from 'services/api'
import { LoginLayout } from './layout'

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [accessKey, setAccessKey] = useState('')
  const [sendedLoginRequest, setSendedLoginRequest] = useState(false)

  const router = useRouter()
  const toast = useToast()

  async function handleLogin(e: any) {
    e.preventDefault()
    if (sendedLoginRequest) {
      return
    }
    try {
      setSendedLoginRequest(true)
      if (!accessKey) {
        toast.closeAll()
        toast({
          status: 'error',
          title: 'Não deixe nada em branco :(',
          duration: 3000,
          isClosable: true,
        })
        setSendedLoginRequest(false)
        return
      }

      const response = await api.post('/auth/login', { accessKey })

      if (!response.data.isAuthorized) {
        toast.closeAll()
        toast({
          status: 'error',
          title: 'Chave de acesso incorreta!',
          duration: 3000,
          isClosable: true,
        })
        setSendedLoginRequest(false)
        return
      }

      toast.closeAll()
      toast({
        status: 'success',
        title: response.data.message,
        duration: 1000,
      })

      setCookie(null, 'isAuthorized', 'true', {
        maxAge: 60 * 60 * 24 * 20,
      })

      router.push('/products')
    } catch (error: any) {
      setSendedLoginRequest(false)
      toast.closeAll()
      toast({
        status: 'error',
        title: error?.response.data.message,
      })
    }
  }
  return (
    <LoginLayout
      setShowPassword={setShowPassword}
      showPassword={showPassword}
      handleLogin={handleLogin}
      accessKey={accessKey}
      setAccessKey={setAccessKey}
      sendedLoginRequest={sendedLoginRequest}
    />
  )
}
