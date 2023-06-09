import { Request, Response } from "express";
import deleteProductsService from "../../services/products/deleteProducts.services";


const deleteProduct = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const bodyParams= req.body

   await deleteProductsService(bodyParams)

   return res.status(204).send();
};

export default deleteProduct;