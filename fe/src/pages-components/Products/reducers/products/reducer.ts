import { IProduct } from '../../../../../@types/Product'

export interface ActionTypes {
  type:
    | 'ADD-PRODUCTS'
    | 'ADD-ONE-PRODUCT'
    | 'REMOVE-ONE-PRODUCT'
    | 'UPDATE-ONE-PRODUCT'
    | 'FAVORITE-PRODUCT'
    | 'UNFAVORITE-PRODUCT'
  payload: any
}

interface ProductsState {
  value: IProduct[]
}

export const productsReducer = (state: ProductsState, action: ActionTypes) => {
  switch (action.type) {
    case 'ADD-PRODUCTS': {
      return { value: action.payload }
    }
    case 'ADD-ONE-PRODUCT': {
      return { value: [...state.value, action.payload] }
    }
    case 'REMOVE-ONE-PRODUCT': {
      const updatedProducts = state.value.filter(
        (product) => product.id !== action.payload,
      )
      return { value: updatedProducts }
    }
    case 'UPDATE-ONE-PRODUCT': {
      const updatedProducts = state.value.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload
        }
        return product
      })

      return { value: updatedProducts }
    }
    default:
      throw new Error('This type is invalid')
  }
}
