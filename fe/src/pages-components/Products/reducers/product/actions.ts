import { IProduct } from '../../../../../@types/Product'

export enum ActionTypes {
  ADD_PRODUCTS = 'ADD_PRODUCTS',
  ADD_ONE_PRODUCT = 'ADD_ONE_PRODUCT',
  REMOVE_ONE_PRODUCT = 'REMOVE_ONE_PRODUCT',
  UPDATE_ONE_PRODUCT = 'UPDATE_ONE_PRODUCT',
}

export function addProductAction(newProduct: IProduct) {
  return { type: ActionTypes.ADD_PRODUCTS, payload: newProduct }
}

export function addNewProductAction(newProduct: IProduct) {
  return { type: ActionTypes.ADD_ONE_PRODUCT, payload: newProduct }
}

export function removeProductAction(id: string) {
  return { type: ActionTypes.REMOVE_ONE_PRODUCT, payload: id }
}

export function updateProductAction(updateProduct: IProduct) {
  return { type: ActionTypes.UPDATE_ONE_PRODUCT, payload: updateProduct }
}
