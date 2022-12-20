import { GetServerSideProps, NextPage } from 'next'
import nookies from 'nookies'

import { Login as LoginComponent } from '../pages-components/Login'

const Login: NextPage = () => <LoginComponent />

export default Login

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context)
  const { isAuthorized } = cookies

  if (isAuthorized) {
    return {
      redirect: {
        destination: '/products',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
