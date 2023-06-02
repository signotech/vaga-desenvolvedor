import { Request, Response } from "express";
import { TProductRequest, TProductResponse } from "../../interfaces/products/products.interfaces";
import postProductService from "../../services/products/postProducts.services";

const postProduct = async (
   req: Request,
   res: Response
): Promise<Response> => {
   
   const bodyData:TProductRequest = req.body

   const newProducts:TProductResponse = await postProductService(bodyData)

   return res.status(201).json(newProducts);
};

export default postProduct ;
