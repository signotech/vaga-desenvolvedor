import { promises } from 'dns';
import Client from '../../../models/clientsModel'
import { TClientRequest, TClientResponse } from '../../interfaces/clientInterface/client.interface';

   const postClientService = async (bodyParams:TClientRequest):Promise<TClientResponse> => {

      const newClient:TClientResponse = await Client.create(bodyParams);

      return newClient
   }


export default postClientService