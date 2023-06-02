import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/error";
import Client from "../../models/clientsModel";
import Products from "../../models/productsModel";

const checkValidId = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const routPath: string = req.baseUrl;

   const Id: number = parseInt(req.params.id);

   if (routPath == "/client") {
      const getClient = await Client.findByPk(Id);

      if (!getClient) {
         throw new AppError("Client not found", 404);
      }
   }

   if (routPath == "/products") {
      const getProducts = await Products.findByPk(Id);

      if (!getProducts) {
         throw new AppError("Product not found", 404);
      }
   }

   return next();
};

export default checkValidId;
