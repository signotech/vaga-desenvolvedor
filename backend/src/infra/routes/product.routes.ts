import { CreateProductController } from "@infra/controllers/products/CreateProductController";
import { DeleteAllProductsController } from "@infra/controllers/products/DeleteAllProductsController";
import { DeleteProductController } from "@infra/controllers/products/DeleteProductController";
import { ShowAllProductsController } from "@infra/controllers/products/ShowAllProductsController";
import { ShowProductByIdController } from "@infra/controllers/products/ShowProductByIdController";
import { UpdateProductController } from "@infra/controllers/products/UpdateProductController";
import { authMiddleware } from "@infra/middlewares/auth.middleware";
import { Segments, celebrate } from "celebrate";
import { Router } from "express";
import Joi from "joi";

const productRouter = Router()

//Controllers
const showAllProductsController = new ShowAllProductsController()
const showProductByIdController = new ShowProductByIdController()
const createProductController = new CreateProductController()
const deleteProductController = new DeleteProductController()
const updateProductController = new UpdateProductController()
const deleteAllProductsController = new DeleteAllProductsController()

productRouter.use(authMiddleware)

productRouter.get("/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().required()
        }
    })
    , showProductByIdController.handle)

productRouter.get("/",
    celebrate({
        [Segments.QUERY]: {
            take: Joi.number().integer().required(),
            skip: Joi.number().integer().required()
        }
    }),
    showAllProductsController.handle
)

productRouter.post("/",
    celebrate({
        [Segments.BODY]: {
            titulo: Joi.string().required().min(3),
            estoque: Joi.number().required(),
            preco: Joi.number().required(),
            sku: Joi.string().required().min(6).max(18)
        }
    })
    , createProductController.handle)

productRouter.put("/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().required()
        },
        [Segments.BODY]: {
            titulo: Joi.string().min(3).optional(),
            estoque: Joi.number().optional(),
            preco: Joi.number().optional(),
            sku: Joi.string().min(6).max(18).optional()
        }
    }),
    updateProductController.handle
)

productRouter.delete("/:id", 
    celebrate({
        [Segments.PARAMS]: {
            id:Joi.number().integer().required()
        }
    }),
    deleteProductController.handle
)

productRouter.delete("/", deleteAllProductsController.handle)




export default productRouter