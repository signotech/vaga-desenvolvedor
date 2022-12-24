import { IClient } from '../../../../@types/Client'

export enum ActionTypes {
  ADD_CLIENTS = 'ADD_CLIENTS',
  ADD_ONE_CLIENT = 'ADD_ONE_CLIENT',
  REMOVE_ONE_CLIENT = 'REMOVE_ONE_CLIENT',
  UPDATE_ONE_CLIENT = 'UPDATE_ONE_CLIENT',
}

export function addClientAction(newClient: IClient) {
  return { type: ActionTypes.ADD_CLIENTS, payload: newClient }
}

export function addNewClientAction(newClient: IClient) {
  return { type: ActionTypes.ADD_ONE_CLIENT, payload: newClient }
}

export function removeClientAction(id: string) {
  return { type: ActionTypes.REMOVE_ONE_CLIENT, payload: id }
}

export function updateClientAction(updateClient: IClient) {
  return { type: ActionTypes.UPDATE_ONE_CLIENT, payload: updateClient }
}
