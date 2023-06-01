import { Request, Response } from "express";
import getClientService from "../../services/clientServices/getClient.services";
import { TClientResponse } from "../../interfaces/clientInterface/client.interface";


const getClient = async (
   req: Request,
   res: Response
): Promise<Response> => {
   
   const getClients:TClientResponse[] =  await getClientService()

   return res.status(200).json(getClients);
};

export default getClient;
