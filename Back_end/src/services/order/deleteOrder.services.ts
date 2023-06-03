import Order from '../../../models/productsOrderModel';
import { AppError } from '../../error/error';
import { TdeleteSchema } from '../../interfaces/massDelete.interfaces';

   const deleteOrderService = async (bodyParams:TdeleteSchema ):Promise<void> => {
      const { massDelete } = bodyParams;

      if(massDelete.length == 0 ){
         throw new AppError("send id required", 404)
      }
   
      await Order.destroy({
         where: { id: massDelete },
      });

   }

export default deleteOrderService