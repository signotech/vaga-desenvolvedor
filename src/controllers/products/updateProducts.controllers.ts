import { Request, Response } from "express";
import { TProductResponse, TProductUpdateRequest } from "../../interfaces/products/products.interfaces";
import updateProductService from "../../services/products/updateProducts.services";

const updateProduct = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const productId: number = parseInt(req.params.id);
   const bodyData:TProductUpdateRequest  = req.body

   const newProducts:TProductResponse = await updateProductService(bodyData,productId)

   return res.status(200).json(newProducts);
};

export default updateProduct ;
