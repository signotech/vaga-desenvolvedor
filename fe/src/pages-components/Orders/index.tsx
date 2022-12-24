import produce from 'immer'
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
import {
  addNewOrderAction,
  addOrderAction,
  removeOrderAction,
  updateOrderAction,
} from './reducers/order/actions'
import { ordersReducer } from './reducers/order/reducer'

interface OrderContextProps {
  orders: IOrder[]
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
  totalPages: number
  customersTotal: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
  isLoading: boolean
  searchContent: string
  setSearchContent: Dispatch<SetStateAction<string>>
  createNewOrder: (order: IOrder) => void
  removeOrder: (orderId: string) => void
  updateOrder: (order: IOrder) => void
}

export const OrderContext = createContext({} as OrderContextProps)

export function Orders() {
  const [ordersState, dispatch] = useReducer(ordersReducer, {
    orders: [],
    customersTotal: 0,
    pageSize: 0,
  })

  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)

  const [searchContent, setSearchContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const { orders, customersTotal, pageSize } = ordersState

  const totalPages =
    Math.ceil(customersTotal / pageSize) === 0
      ? 1
      : Math.ceil(customersTotal / pageSize)

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get(`/orders?skip=${page}&category=${filter}`)
      dispatch(addOrderAction(data))
      setIsLoading(false)
    }

    fetchData()
  }, [page, searchContent, filter, customersTotal])

  function createNewOrder(data: IOrder) {
    dispatch(addNewOrderAction(data))
  }

  function removeOrder(itemId: string) {
    dispatch(removeOrderAction(itemId))
  }

  function updateOrder(data: IOrder) {
    dispatch(updateOrderAction(data))
  }

  return (
    <OrderContext.Provider
      value={{
        updateOrder,
        removeOrder,
        customersTotal,
        totalPages,
        createNewOrder,
        searchContent,
        setSearchContent,
        isLoading,
        orders: orders.slice(0, pageSize),
        page,
        setPage,
        filter,
        setFilter,
      }}
    >
      <OrdersLayout />
    </OrderContext.Provider>
  )
}
