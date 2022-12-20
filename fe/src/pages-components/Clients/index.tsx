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
import { ClientsLayout } from './layout'
import { ActionTypes, clientsReducer } from './reducers/clients/reducer'

interface ClientsContextProps {
  clients: IClient[] | []
  dispatch: Dispatch<ActionTypes>
  orderBy: string
  isLoading: boolean
  searchContent: string
  setSearchContent: Dispatch<SetStateAction<string>>
  setOrderBy: Dispatch<SetStateAction<string>>
}

export const ClientContext = createContext({} as ClientsContextProps)

export function Clients() {
  const [clients, dispatch] = useReducer(clientsReducer, {
    value: [],
  })

  const [orderBy, setOrderBy] = useState('')
  const [searchContent, setSearchContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get('/clients')
      setIsLoading(false)
      dispatch({ type: 'ADD-CLIENTS', payload: data })
    }

    fetchData()
  }, [])
  return (
    <ClientContext.Provider
      value={{
        searchContent,
        setSearchContent,
        isLoading,
        dispatch,
        clients: clients.value,
        orderBy,
        setOrderBy,
      }}
    >
      <ClientsLayout />
    </ClientContext.Provider>
  )
}
