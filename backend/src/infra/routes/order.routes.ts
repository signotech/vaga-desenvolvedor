import { CreateOrderController } from "@infra/controllers/orders/CreateOrderController";
import { DeleteAllOrdersController } from "@infra/controllers/orders/DeleteAllOrdersController";
import { DeleteOrderController } from "@infra/controllers/orders/DeleteOrderController";
import { ShowAllOrdersController } from "@infra/controllers/orders/ShowAllOrdersControler";
import { ShowOrderByIdController } from "@infra/controllers/orders/ShowOrderByIdController";
import { UpdateOrderController } from "@infra/controllers/orders/UpdateOrderController";
import { authMiddleware } from "@infra/middlewares/auth.middleware";
import { Segments, celebrate } from "celebrate";
import { Router } from "express";
import Joi from "joi";

const orderRouter = Router()

//Controllers
const showOrderByIdController = new ShowOrderByIdController()
const showAllOrdersController = new ShowAllOrdersController()
const createOrderController = new CreateOrderController()
const updateOrderController = new UpdateOrderController()
const deleteOrderController = new DeleteOrderController()
const deleteAllOrdersController = new DeleteAllOrdersController()

orderRouter.use(authMiddleware)

orderRouter.get('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().required()
        }
    }),
    showOrderByIdController.handle
)

orderRouter.get('/',
    celebrate({
        [Segments.QUERY]: {
            skip: Joi.number().integer().required(),
            take: Joi.number().integer().required(),
        }
    }),
    showAllOrdersController.handle
)

orderRouter.post("/",
    celebrate({
        [Segments.BODY]: {
            ids_produtos: Joi.array().items(
                Joi.object({
                    id: Joi.number().integer().required(),
                    quantidade: Joi.number().integer().required()
                })
            ).required(),
            valor: Joi.number().required(),
            id_cliente: Joi.number().integer().required(),
            desconto: Joi.number().integer().required(),
            data: Joi.date().required(),
            status: Joi.number().integer().required()
        }
    }),
    createOrderController.handle
)

orderRouter.put("/",
    celebrate({
        [Segments.BODY]: {
            ids_produtos: Joi.array().items(
                Joi.object({
                    id: Joi.number().integer().required(),
                    quantidade: Joi.number().integer().required()
                })
            ).optional(),
            price: Joi.number().optional(),
            id_cliente: Joi.number().integer().optional(),
            desconto: Joi.number().integer().optional(),
            data: Joi.date().optional(),
            status: Joi.number().integer().optional()
        }
    }),
    updateOrderController.handle
)

orderRouter.delete("/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().required()
        }
    }),
deleteOrderController.handle
)

orderRouter.delete("/", deleteAllOrdersController.handle)

export default orderRouter