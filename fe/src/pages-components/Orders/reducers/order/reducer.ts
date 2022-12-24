import produce from 'immer'
import { IOrder } from '../../../../../@types/Order'
import { ActionTypes } from './actions'

interface OrdersState {
  orders: IOrder[]
  customersTotal: number // total de products
  pageSize: number // tamanho da pagina
}

// STATE = valor Atual em tempo real
// ACTION = qual ação o usuário esta querendo fazer, para alterar um estado

export function ordersReducer(state: OrdersState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_ORDERS:
      console.log(action.payload)
      return {
        ...state,
        orders: [...action.payload.orders],
        customersTotal: action.payload.count,
        pageSize: action.payload.pageSize,
      }

    case ActionTypes.ADD_ONE_ORDER:
      return produce(state, (draft) => {
        draft.orders.push(action.payload)
        draft.customersTotal = draft.orders.length
      })

    case ActionTypes.UPDATE_ONE_ORDER:
      return produce(state, (draft) => {
        const itemIndex = draft.orders.findIndex(
          (item) => item.id === action.payload.id,
        )

        if (itemIndex !== -1) {
          draft.orders[itemIndex] = action.payload
        }
      })

    case ActionTypes.REMOVE_ONE_ORDER:
      return produce(state, (draft) => {
        console.log(action.payload)
        draft.orders.splice(action.payload, 1)
        draft.customersTotal = draft.orders.length
      })
    default:
      return state
  }
}
