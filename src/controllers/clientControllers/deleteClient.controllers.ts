import { Request, Response } from "express";
import deleteClientService from "../../services/clientServices/deleteClient.services";

const deleteClient = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const clientId: number = parseInt(req.params.id);

   await deleteClientService(clientId)

   return res.status(204).send();
};

export default deleteClient;