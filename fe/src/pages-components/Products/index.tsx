import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { api } from 'services/api'
import { IProduct } from '../../../@types/Product'
import { ProductsLayout } from './layout'
import {
  addNewProductAction,
  addProductAction,
  removeProductAction,
  updateProductAction,
} from './reducers/product/actions'
import { productsReducer } from './reducers/product/reducer'

interface ProductContextProps {
  products: IProduct[]
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
  page: number
  setPage: Dispatch<SetStateAction<number>>
  totalPages: number
  customersTotal: number
  orderBy: string
  searchContent: string
  setSearchContent: Dispatch<SetStateAction<string>>
  isLoading: boolean
  setOrderBy: Dispatch<SetStateAction<string>>
  createNewProduct: (product: IProduct) => void
  removeProduct: (productId: string) => void
  updateProduct: (product: IProduct) => void
}

export const ProductContext = createContext({} as ProductContextProps)

export function Products() {
  const [productState, dispatch] = useReducer(productsReducer, {
    products: [],
    customersTotal: 0,
    pageSize: 0,
  })

  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState('')
  const [searchContent, setSearchContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const { products, customersTotal, pageSize } = productState

  const totalPages =
    Math.ceil(customersTotal / pageSize) === 0
      ? 1
      : Math.ceil(customersTotal / pageSize)

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get(
        `/products?skip=${page}&name=${
          searchContent || ''
        }&category=${filter}&orderBy=${orderBy}`,
      )
      dispatch(addProductAction(data))
      setIsLoading(false)
    }

    fetchData()
  }, [page, searchContent, filter, orderBy, customersTotal])

  function createNewProduct(data: IProduct) {
    dispatch(addNewProductAction(data))
  }

  function removeProduct(itemId: string) {
    dispatch(removeProductAction(itemId))
  }

  function updateProduct(data: IProduct) {
    dispatch(updateProductAction(data))
  }

  return (
    <ProductContext.Provider
      value={{
        customersTotal,
        totalPages,
        createNewProduct,
        removeProduct,
        updateProduct,
        setFilter,
        filter,
        page,
        setPage,
        searchContent,
        setSearchContent,
        isLoading,
        products: products.slice(0, pageSize),
        orderBy,
        setOrderBy,
      }}
    >
      <ProductsLayout />
    </ProductContext.Provider>
  )
}
