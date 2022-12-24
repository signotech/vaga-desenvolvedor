import produce from 'immer'
import { IProduct } from '../../../../../@types/Product'
import { ActionTypes } from './actions'

interface ProductsState {
  products: IProduct[]
  customersTotal: number // total de products
  pageSize: number // tamanho da pagina
}

// STATE = valor Atual em tempo real
// ACTION = qual ação o usuário esta querendo fazer, para alterar um estado

export function productsReducer(state: ProductsState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCTS:
      return {
        ...state,
        products: [...action.payload.products],
        customersTotal: action.payload.count,
        pageSize: action.payload.pageSize,
      }

    case ActionTypes.ADD_ONE_PRODUCT:
      return produce(state, (draft) => {
        draft.products.push(action.payload)
        draft.customersTotal = draft.products.length
      })

    case ActionTypes.UPDATE_ONE_PRODUCT:
      return produce(state, (draft) => {
        const itemIndex = draft.products.findIndex(
          (item) => item.id === action.payload.id,
        )

        if (itemIndex !== -1) {
          draft.products[itemIndex] = action.payload
        }
      })

    case ActionTypes.REMOVE_ONE_PRODUCT:
      return produce(state, (draft) => {
        console.log(action.payload)
        draft.products.splice(action.payload, 1)
        draft.customersTotal = draft.products.length
      })
    default:
      return state
  }
}
