import Products from '../../../models/productsModel';
import { TProductResponse } from '../../interfaces/products/products.interfaces';

   const getProductService = async (queryParams:any):Promise<TProductResponse[]> => {

      const page: number = parseInt(queryParams.page);
      const perPage: number = parseInt(queryParams.perPage);
   
      const getClient:TProductResponse[] = await Products.findAll({
         offset: (page - 1) * perPage,
         limit: perPage,
      });

      return getClient
   }

export default getProductService 