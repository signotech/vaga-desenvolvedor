import { Request, Response } from "express";
import { TOrderRequest, TOrderResponse } from "../../interfaces/order/order.interfaces";
import postOrderService from "../../services/order/postOrder.services";

const postOrder = async (
   req: Request,
   res: Response
): Promise<Response> => {
   
   const bodyData:TOrderRequest = req.body

   const newOrder:TOrderResponse= await postOrderService(bodyData)

   return res.status(201).json(newOrder);
};

export default postOrder ;
