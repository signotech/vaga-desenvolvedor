import Order from "../../../models/productsOrderModel"
import { TOrderRequest, TOrderResponse } from '../../interfaces/order/order.interfaces';

   const postOrderService = async (bodyParams:TOrderRequest):Promise<TOrderResponse> => {

      const newProduct:TOrderResponse= await Order.create(bodyParams);

      return newProduct
   }


export default postOrderService