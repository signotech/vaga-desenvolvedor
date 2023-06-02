import Order from '../../../models/productsOrderModel';
import { TOrderResponse } from '../../interfaces/order/order.interfaces';


   const getOrderService = async ():Promise<TOrderResponse[]> => {

      const getOrder:TOrderResponse[] = await Order.findAll();

      return getOrder
   }

export default getOrderService 