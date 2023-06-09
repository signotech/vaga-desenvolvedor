import { Request, Response } from "express";
import deleteOrderService from "../../services/order/deleteOrder.services";


const deleteOrder = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const bodyParams = req.body

   await deleteOrderService(bodyParams)

   return res.status(204).send();
};

export default deleteOrder;