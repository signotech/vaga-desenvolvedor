import { Request, Response } from "express";
import deleteOrderService from "../../services/order/deleteOrder.services";
import { TdeleteSchema } from "../../interfaces/massDelete.interfaces";

const deleteOrder = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const bodyParams:TdeleteSchema = req.body

   await deleteOrderService(bodyParams)

   return res.status(204).send();
};

export default deleteOrder;