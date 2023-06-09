import Order from '../../../models/productsOrderModel';
import { AppError } from '../../error/error';


   const deleteOrderService = async (bodyParams:any ):Promise<void> => {
      const { massDelete } = bodyParams;

      if(massDelete.length == 0 ){
         throw new AppError("send id required", 404)
      }
   
      await Order.destroy({
         where: { id: massDelete },
      });

   }

export default deleteOrderService