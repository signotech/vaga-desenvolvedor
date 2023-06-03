import { Request, Response } from "express";
import { TOrderResponse, TOrderUpdateRequest } from "../../interfaces/order/order.interfaces";
import updateOrderService from "../../services/order/updateOrder.services";

const updateOrder = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const clientId: number = parseInt(req.params.id);
   
   const bodyData:TOrderUpdateRequest  = req.body

   const newClient:TOrderResponse = await updateOrderService(bodyData,clientId)

   return res.status(200).json(newClient);
};

export default updateOrder ;
