import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/error";
import Products from "../../models/productsModel";

const checkDuplicateProduts = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const title: string = req.body.title_product;

   const checkTitle = await Products.findOne({ where: { title_product: title } });

   if (checkTitle) {
      throw new AppError(`product: ${title} already exists`, 409);
   }

   return next();
};

export default checkDuplicateProduts;
