import { Request, Response } from "express";
import deleteClientService from "../../services/clientServices/deleteClient.services";


const deleteClient = async (
   req: Request,
   res: Response
): Promise<Response> => {
   
   const bodyParams = req.body

   await deleteClientService(bodyParams)

   return res.status(204).send();
};

export default deleteClient;