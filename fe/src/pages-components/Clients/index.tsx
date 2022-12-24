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
import { IClient } from '../../../@types/Client'
import { AddItemModal } from './components/ModalForm/AddItemModal'
import { ClientsLayout } from './layout'
import {
  addClientAction,
  addNewClientAction,
  removeClientAction,
  updateClientAction,
} from './reducers/client/actions'
import { clientsReducer } from './reducers/client/reducer'

interface ClientsContextProps {
  clients: IClient[]
  orderBy: string
  isLoading: boolean
  searchContent: string
  page: number
  totalPages: number
  customersTotal: number
  setPage: Dispatch<SetStateAction<number>>
  setSearchContent: Dispatch<SetStateAction<string>>
  setOrderBy: Dispatch<SetStateAction<string>>
  createNewClient: (client: IClient) => void
  removeClient: (id: string) => void
  updateClient: (client: IClient) => void
}

export const ClientContext = createContext({} as ClientsContextProps)

export function Clients() {
  const [clientsState, dispatch] = useReducer(clientsReducer, {
    clients: [],
    customersTotal: 0,
    pageSize: 0,
  })

  const [orderBy, setOrderBy] = useState('')
  const [searchContent, setSearchContent] = useState('')

  const [page, setPage] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false)

  const { clients, customersTotal, pageSize } = clientsState

  const totalPages =
    Math.ceil(customersTotal / pageSize) === 0
      ? 1
      : Math.ceil(customersTotal / pageSize)

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get(
        `/clients?skip=${page}&name=${searchContent || ''}&orderBy=${orderBy}`,
      )
      dispatch(addClientAction(data))
      setIsLoading(false)
    }

    fetchData()
  }, [page, searchContent, orderBy, customersTotal])

  function createNewClient(data: IClient) {
    dispatch(addNewClientAction(data))
  }

  function removeClient(id: string) {
    dispatch(removeClientAction(id))
  }

  function updateClient(data: IClient) {
    dispatch(updateClientAction(data))
  }

  return (
    <ClientContext.Provider
      value={{
        removeClient,
        customersTotal,
        updateClient,
        totalPages,
        setPage,
        page,
        createNewClient,
        searchContent,
        setSearchContent,
        isLoading,
        clients: clients.slice(0, pageSize),
        orderBy,
        setOrderBy,
      }}
    >
      <ClientsLayout setIsAddItemModalOpen={setIsAddItemModalOpen} />

      <AddItemModal
        isAddItemModalOpen={isAddItemModalOpen}
        setIsAddItemModalOpen={setIsAddItemModalOpen}
      />
    </ClientContext.Provider>
  )
}
