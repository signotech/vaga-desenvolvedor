import { Request, Response } from "express";
import deleteProductsService from "../../services/products/deleteProducts.services";

const deleteProduct = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const productsId: number = parseInt(req.params.id);

   await deleteProductsService(productsId)

   return res.status(204).send();
};

export default deleteProduct;