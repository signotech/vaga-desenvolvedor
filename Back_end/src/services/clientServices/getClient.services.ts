import Client from "../../../models/clientsModel";
import { TClientResponse } from "../../interfaces/clientInterface/client.interface";
import dynamicFilter from "../../middlewares/dynamicFilter";
import dynamicOrdering from "../../middlewares/dynamicOrdering";


const getClientService = async (
   queryParams: any
   ): Promise<TClientResponse[]> => {

      let page: number = parseInt(queryParams.page);
      let perPage: number = parseInt(queryParams.perPage);
      
      if (Number.isNaN(page)) {
         page = 1
      }
      if (Number.isNaN(perPage)) {
         perPage = 20
      }


   const getClient: TClientResponse[] = await Client.findAll({
      where: dynamicFilter(queryParams),
      order: dynamicOrdering(queryParams),
      offset: (page - 1) * perPage,
      limit: perPage,
   });

   return getClient;
};

export default getClientService;
