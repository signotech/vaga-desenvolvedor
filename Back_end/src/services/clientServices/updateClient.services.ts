import Client from '../../../models/clientsModel'
import { TClientResponse, TClienetupdateRequest} from '../../interfaces/clientInterface/client.interface';

   const updateClientService = async (bodyParams:TClienetupdateRequest, clientId:number):Promise<TClientResponse> => {


      const getClient = await Client.findByPk(clientId);

      const updateClient:TClientResponse = await getClient.update(bodyParams);

      return updateClient
   }


export default updateClientService