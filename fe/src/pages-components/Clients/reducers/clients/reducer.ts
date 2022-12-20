import { IProduct } from '../../../../../@types/Product'

export interface ActionTypes {
  type:
    | 'ADD-CLIENTS'
    | 'ADD-ONE-CLIENT'
    | 'REMOVE-ONE-CLIENT'
    | 'UPDATE-ONE-CLIENT'
  payload: any
}

interface ClientsState {
  value: IProduct[]
}

export const clientsReducer = (state: ClientsState, action: ActionTypes) => {
  switch (action.type) {
    case 'ADD-CLIENTS': {
      return { value: action.payload }
    }
    case 'ADD-ONE-CLIENT': {
      return { value: [...state.value, action.payload] }
    }
    case 'REMOVE-ONE-CLIENT': {
      const updatedClients = state.value.filter(
        (product) => product.id !== action.payload,
      )
      return { value: updatedClients }
    }
    case 'UPDATE-ONE-CLIENT': {
      const updatedClients = state.value.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload
        }
        return product
      })

      return { value: updatedClients }
    }
    default:
      throw new Error('This type is invalid')
  }
}
