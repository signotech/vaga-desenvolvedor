import { TProductRequest, TProductResponse } from '../../interfaces/products/products.interfaces';
import Products from "../../../models/productsModel"
   const postProductService = async (bodyParams:TProductRequest):Promise<TProductResponse> => {

      const newProduct:TProductResponse = await Products.create(bodyParams);

      return newProduct
   }


export default postProductService