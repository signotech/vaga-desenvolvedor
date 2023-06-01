import Client from '../../../models/clientsModel'
import { TClientResponse } from '../../interfaces/clientInterface/client.interface';

   const getClientService = async ():Promise<TClientResponse[]> => {

      const getClient:TClientResponse[] = await Client.findAll();

      return getClient
   }

export default getClientService