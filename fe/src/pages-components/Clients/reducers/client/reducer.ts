import produce from 'immer'
import { IClient } from '../../../../@types/Client'
import { ActionTypes } from './actions'

interface ClientsState {
  clients: IClient[]
  customersTotal: number // total de clients
  pageSize: number // tamanho da pagina
}

// STATE = valor Atual em tempo real
// ACTION = qual ação o usuário esta querendo fazer, para alterar um estado

export function clientsReducer(state: ClientsState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_CLIENTS:
      return {
        ...state,
        clients: [...action.payload.clients],
        customersTotal: action.payload.count,
        pageSize: action.payload.pageSize,
      }

    case ActionTypes.ADD_ONE_CLIENT:
      return produce(state, (draft) => {
        draft.clients.push(action.payload)
        draft.customersTotal = draft.clients.length
      })

    case ActionTypes.UPDATE_ONE_CLIENT:
      return produce(state, (draft) => {
        const itemIndex = draft.clients.findIndex(
          (item) => item.id === action.payload.id,
        )

        if (itemIndex !== -1) {
          draft.clients[itemIndex] = action.payload
        }
      })

    case ActionTypes.REMOVE_ONE_CLIENT:
      return produce(state, (draft) => {
        draft.clients.splice(action.payload, 1)
        draft.customersTotal = draft.clients.length
      })
    default:
      return state
  }
}
// return {
//   ...state,
//   clients: state.clients.filter((client) => client.id !== action.payload),
// }
