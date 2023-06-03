import Products from '../../../models/productsModel';
import { TProductResponse } from '../../interfaces/products/products.interfaces';
import dynamicFilter from '../../middlewares/dynamicFilter';
import dynamicOrdering from '../../middlewares/dynamicOrdering';

   const getProductService = async (queryParams:any):Promise<TProductResponse[]> => {

      let page: number = parseInt(queryParams.page);
      let perPage: number = parseInt(queryParams.perPage);
      
      if (Number.isNaN(page)) {
         page = 1
      }
      if (Number.isNaN(perPage)) {
         perPage = 20
      }

      const getClient:TProductResponse[] = await Products.findAll({
         where: dynamicFilter(queryParams),
         order: dynamicOrdering(queryParams),
         offset: (page - 1) * perPage,
         limit: perPage,
      });

      return getClient
   }

export default getProductService 