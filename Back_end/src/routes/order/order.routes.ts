import { Router } from "express";
import { deleteOrder, getOrder, postOrder, updateOrder } from "../../controllers/order";
import { orderSchemaRequest, updateOrderRequest } from "../../schemas/order/order.schemas";
import { checkValidId, validBodySchemas } from "../../middlewares";


const orderRoutes: Router = Router();

orderRoutes.post("",validBodySchemas(orderSchemaRequest),postOrder);

orderRoutes.get("",getOrder);

orderRoutes.patch("/:id",checkValidId,validBodySchemas(updateOrderRequest), updateOrder);

orderRoutes.put("",deleteOrder);

export default orderRoutes;
