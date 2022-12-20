import { GetServerSideProps, NextPage } from 'next'
import { Clients as ClientsComponent } from 'pages-components/Clients'
import nookies from 'nookies'

const Clients: NextPage = () => <ClientsComponent />

export default Clients

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
