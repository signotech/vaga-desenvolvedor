import { Request, Response } from "express";
import { TOrderResponse } from "../../interfaces/order/order.interfaces";
import getOrderService from "../../services/order/getOrder.services";


const getOrder = async (
   req: Request,
   res: Response
): Promise<Response> => {

   const queryParams = req.query;

   const getOrder:TOrderResponse[] = await getOrderService(queryParams)

   return res.status(200).json(getOrder);
};

export default getOrder;
