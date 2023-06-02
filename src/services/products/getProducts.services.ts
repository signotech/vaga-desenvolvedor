import Products from '../../../models/productsModel';
import { TProductResponse } from '../../interfaces/products/products.interfaces';

   const getProductService = async ():Promise<TProductResponse[]> => {

      const getClient:TProductResponse[] = await Products.findAll();

      return getClient
   }

export default getProductService 