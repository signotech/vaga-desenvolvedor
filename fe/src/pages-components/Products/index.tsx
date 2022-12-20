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
import { ActionTypes, productsReducer } from './reducers/products/reducer'

interface ProductContextProps {
  products: IProduct[] | []
  dispatch: Dispatch<ActionTypes>
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
  orderBy: string
  searchContent: string
  setSearchContent: Dispatch<SetStateAction<string>>
  isLoading: boolean
  setOrderBy: Dispatch<SetStateAction<string>>
}

export const ProductContext = createContext({} as ProductContextProps)

export function Products() {
  const [products, dispatch] = useReducer(productsReducer, {
    value: [],
  })

  const [filter, setFilter] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [searchContent, setSearchContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get('/products')
      setIsLoading(false)
      dispatch({ type: 'ADD-PRODUCTS', payload: data })
    }

    fetchData()
  }, [])
  return (
    <ProductContext.Provider
      value={{
        searchContent,
        setSearchContent,
        isLoading,
        dispatch,
        products: products.value,
        filter,
        setFilter,
        orderBy,
        setOrderBy,
      }}
    >
      <ProductsLayout />
    </ProductContext.Provider>
  )
}
