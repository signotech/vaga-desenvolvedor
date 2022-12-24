import { IOrder } from '../../../../../@types/Order'

export enum ActionTypes {
  ADD_ORDERS = 'ADD_ORDERS',
  ADD_ONE_ORDER = 'ADD_ONE_ORDER',
  REMOVE_ONE_ORDER = 'REMOVE_ONE_ORDER',
  UPDATE_ONE_ORDER = 'UPDATE_ONE_ORDER',
}

export function addOrderAction(newOrder: IOrder) {
  return { type: ActionTypes.ADD_ORDERS, payload: newOrder }
}

export function addNewOrderAction(newOrder: IOrder) {
  return { type: ActionTypes.ADD_ONE_ORDER, payload: newOrder }
}

export function removeOrderAction(id: string) {
  return { type: ActionTypes.REMOVE_ONE_ORDER, payload: id }
}

export function updateOrderAction(updateOrder: IOrder) {
  return { type: ActionTypes.UPDATE_ONE_ORDER, payload: updateOrder }
}
