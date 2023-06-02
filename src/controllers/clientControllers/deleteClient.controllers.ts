import { Request, Response } from "express";
import deleteClientService from "../../services/clientServices/deleteClient.services";
import { TdeleteSchema } from "../../interfaces/massDelete.interfaces";

const deleteClient = async (
   req: Request,
   res: Response
): Promise<Response> => {
   
   const bodyParams:TdeleteSchema = req.body

   await deleteClientService(bodyParams)

   return res.status(204).send();
};

export default deleteClient;