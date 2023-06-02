import { Request, Response } from "express";
import getClientService from "../../services/clientServices/getClient.services";
import { TClientResponse } from "../../interfaces/clientInterface/client.interface";


const getClient = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const queryParams = req.query;

   const getClients:TClientResponse[] =  await getClientService(queryParams)

   return res.status(200).json(getClients);
};

export default getClient;
