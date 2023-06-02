import Client from "../../../models/clientsModel";
import { TClientResponse } from "../../interfaces/clientInterface/client.interface";

const getClientService = async (queryParams:any): Promise<TClientResponse[]> => {

   const page: number = parseInt(queryParams.page);
   const perPage: number = parseInt(queryParams.perPage);

   const getClient: TClientResponse[] = await Client.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
   });

   return getClient;
};

export default getClientService;
