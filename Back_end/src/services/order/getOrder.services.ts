import Order from "../../../models/productsOrderModel";
import { TOrderResponse } from "../../interfaces/order/order.interfaces";
import dynamicFilter from "../../middlewares/dynamicFilter";
import dynamicOrdering from "../../middlewares/dynamicOrdering";

const getOrderService = async (queryParams: any): Promise<TOrderResponse[]> => {
   
   let page: number = parseInt(queryParams.page);
   let perPage: number = parseInt(queryParams.perPage);
   
   if (Number.isNaN(page)) {
      page = 1
   }
   if (Number.isNaN(perPage)) {
      perPage = 20
   }

   const getOrder: TOrderResponse[] = await Order.findAll({
      where: dynamicFilter(queryParams),
      order: dynamicOrdering(queryParams),
      offset: (page - 1) * perPage,
      limit: perPage,
   });

   return getOrder;
};

export default getOrderService;
