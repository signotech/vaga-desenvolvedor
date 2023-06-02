import { Router } from "express";
import { deleteOrder, getOrder, postOrder, updateOrder } from "../../controllers/order";
import validBodySchema from "../../middlewares/validBodySchemas";
import { orderSchemaRequest, updateOrderRequest } from "../../schemas/order/order.schemas";
import { checkValidId } from "../../middlewares";

const orderRoutes: Router = Router();

orderRoutes.post("",validBodySchema(orderSchemaRequest),postOrder);

orderRoutes.get("",getOrder);

orderRoutes.patch("/:id",checkValidId,validBodySchema(updateOrderRequest), updateOrder);

orderRoutes.delete("/:id",checkValidId,deleteOrder);

export default orderRoutes;
