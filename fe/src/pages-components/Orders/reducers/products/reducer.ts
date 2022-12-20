import { IProduct } from '../../../../../@types/Product'

export interface ActionTypes {
  type: 'ADD-ORDERS' | 'ADD-ONE-ORDER' | 'REMOVE-ONE-ORDER' | 'UPDATE-ONE-ORDER'

  payload: any
}

interface OrdersState {
  value: []
}

export const ordersReducer = (state: OrdersState, action: ActionTypes) => {
  switch (action.type) {
    case 'ADD-ORDERS': {
      return { value: action.payload }
    }
    case 'ADD-ONE-ORDER': {
      return { value: [...state.value, action.payload] }
    }
    case 'REMOVE-ONE-ORDER': {
      const updatedOrders = state.value.filter(
        (order) => order.id !== action.payload,
      )
      return { value: updatedOrders }
    }
    case 'UPDATE-ONE-ORDER': {
      const updatedOrders = state.value.map((order) => {
        if (order.id === action.payload.id) {
          return action.payload
        }
        return order
      })

      return { value: updatedOrders }
    }
    default:
      throw new Error('This type is invalid')
  }
}
