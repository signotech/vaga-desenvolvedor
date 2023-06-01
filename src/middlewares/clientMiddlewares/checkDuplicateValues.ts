import { NextFunction,Request,Response } from "express";
import { AppError } from "../../error/error";
import Client from "../../../models/clientsModel";

const checkDuplicateValues = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {

   const cpf: string = req.body.cpf_client;
   const email: string = req.body.email_client;

   const checkCpf = await Client.findOne({ where: { cpf_client: cpf } })

   const checkEmail = await Client.findOne({ where: { email_client: email } })

   if(checkCpf){
      throw new AppError(`cpf:${cpf} already exists`, 409)
   }

   if(checkEmail){
      throw new AppError(`Email:${email} already exists`, 409)
   }

   return next()
};

export default checkDuplicateValues 