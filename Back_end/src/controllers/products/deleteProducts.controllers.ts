import { Request, Response } from "express";
import deleteProductsService from "../../services/products/deleteProducts.services";
import { TdeleteSchema } from "../../interfaces/massDelete.interfaces";

const deleteProduct = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const bodyParams:TdeleteSchema = req.body

   await deleteProductsService(bodyParams)

   return res.status(204).send();
};

export default deleteProduct;