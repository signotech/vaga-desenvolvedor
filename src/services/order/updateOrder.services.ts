
import Order from '../../../models/productsOrderModel';
import { TOrderResponse, TOrderUpdateRequest } from '../../interfaces/order/order.interfaces';

   const updateOrderService = async (bodyParams:TOrderUpdateRequest, clientId:number):Promise<TOrderResponse> => {

      const getClient = await Order.findByPk(clientId);

      const updateClient:TOrderResponse = await getClient.update(bodyParams);

      return updateClient
   }


export default updateOrderService