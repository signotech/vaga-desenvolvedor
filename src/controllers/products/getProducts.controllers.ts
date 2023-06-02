import { Request, Response } from "express";
import { TProductResponse } from "../../interfaces/products/products.interfaces";
import getProductService from "../../services/products/getProducts.services";

const getProducts = async (
   req: Request,
   res: Response
): Promise<Response> => {
   
   const getProducts:TProductResponse[] =  await getProductService() 

   return res.status(200).json(getProducts);
};

export default getProducts;
