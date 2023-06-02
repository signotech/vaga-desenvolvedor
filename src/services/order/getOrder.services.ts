import Order from "../../../models/productsOrderModel";
import { TOrderResponse } from "../../interfaces/order/order.interfaces";

const getOrderService = async (queryParams: any): Promise<TOrderResponse[]> => {
   
   const page: number = parseInt(queryParams.page);
   const perPage: number = parseInt(queryParams.perPage);

   const getOrder: TOrderResponse[] = await Order.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
   });

   return getOrder;
};

export default getOrderService;
