import { Request, Response } from "express";
import { TClientResponse, updateRequest } from "../../interfaces/clientInterface/client.interface";
import updateClientService from "../../services/clientServices/updateClient.services";

const updateClient = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const clientId: number = parseInt(req.params.id);
   const bodyData:updateRequest  = req.body

   const newClient:TClientResponse = await updateClientService(bodyData,clientId)

   return res.status(200).json(newClient);
};

export default updateClient ;
