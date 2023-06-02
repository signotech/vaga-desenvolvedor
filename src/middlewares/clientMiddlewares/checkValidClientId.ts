import { NextFunction,Request,Response } from "express";
import { AppError } from "../../error/error";
import Client from "../../../models/clientsModel";

const checkValidId = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {

   const clientId:number = parseInt(req.params.id)

   const getClient = await Client.findByPk(clientId);

   if(!getClient){
      throw new AppError("Client not found",404)
   }

   return next()
};

export default checkValidId 