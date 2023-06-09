import { Request, Response } from "express";
import { TClientResponse, TClienetupdateRequest } from "../../interfaces/clientInterface/client.interface";
import updateClientService from "../../services/clientServices/updateClient.services";

const updateClient = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const clientId: number = parseInt(req.params.id);
   const bodyData:TClienetupdateRequest  = req.body

   const newClient:TClientResponse = await updateClientService(bodyData,clientId)

   return res.status(200).json(newClient);
};

export default updateClient ;
