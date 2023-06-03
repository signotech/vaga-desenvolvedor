import { Request, Response } from "express";
import postClientService from "../../services/clientServices/postClient.services";
import { TClientRequest, TClientResponse } from "../../interfaces/clientInterface/client.interface";

const postClient = async (
   req: Request,
   res: Response
): Promise<Response> => {
   
   const bodyData:TClientRequest = req.body

   const newClient:TClientResponse = await postClientService(bodyData)

   return res.status(201).json(newClient);
};

export default postClient ;
