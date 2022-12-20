import { GetServerSideProps, NextPage } from 'next'
import { Products as ProductsComponent } from 'pages-components/Products'
import nookies from 'nookies'

export const Products: NextPage = () => <ProductsComponent />

export default Products

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
