import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { api } from 'services/api'
import { IOrder } from '../../../@types/Order'
import { OrdersLayout } from './layout'
import { ActionTypes, ordersReducer } from './reducers/products/reducer'

interface OrderContextProps {
  orders: IOrder[]
  dispatch: Dispatch<ActionTypes>
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
  orderBy: string
  isLoading: boolean
  searchContent: string
  setSearchContent: Dispatch<SetStateAction<string>>
  setOrderBy: Dispatch<SetStateAction<string>>
}

export const OrderContext = createContext({} as OrderContextProps)

export function Orders() {
  const [orders, dispatch] = useReducer(ordersReducer, {
    value: [],
  })

  const [filter, setFilter] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [searchContent, setSearchContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get('/orders')
      setIsLoading(false)
      dispatch({ type: 'ADD-ORDERS', payload: data })
    }

    fetchData()
  }, [])

  return (
    <OrderContext.Provider
      value={{
        searchContent,
        setSearchContent,
        isLoading,
        dispatch,
        orders: orders.value,
        filter,
        setFilter,
        orderBy,
        setOrderBy,
      }}
    >
      <OrdersLayout />
    </OrderContext.Provider>
  )
}
