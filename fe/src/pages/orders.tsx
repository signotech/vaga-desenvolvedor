import { GetServerSideProps, NextPage } from 'next'
import { Orders as OrdersComponent } from 'pages-components/Orders'
import nookies from 'nookies'

const Orders: NextPage = () => <OrdersComponent />

export default Orders

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context)
  const { isAuthorized } = cookies

  if (!isAuthorized) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
