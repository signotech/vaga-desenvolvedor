import Products from '../../../models/productsModel';
import { TProductResponse, TProductUpdateRequest } from '../../interfaces/products/products.interfaces';

   const updateProductService = async (bodyParams:TProductUpdateRequest, productId:number):Promise<TProductResponse> => {

      const getProduct = await Products.findByPk(productId);

      const updateProduct:TProductResponse = await getProduct.update(bodyParams);

      return updateProduct
   }


export default updateProductService