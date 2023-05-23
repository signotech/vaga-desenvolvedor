import { CreateClientController } from "@infra/controllers/clients/CreateClientController";
import { DeleteAllClientsController } from "@infra/controllers/clients/DeleteAllClientsController";
import { DeleteClientController } from "@infra/controllers/clients/DeleteClientController";
import { ShowAllClientsController } from "@infra/controllers/clients/ShowAllClientsController";
import { ShowClientByIdController } from "@infra/controllers/clients/ShowClientByIdController";
import { UpdateClientController } from "@infra/controllers/clients/UpdateClientController";
import { authMiddleware } from "@infra/middlewares/auth.middleware";
import { Segments, celebrate } from "celebrate";
import { Router } from "express";
import Joi from "joi";

const clientRouter = Router()

//Controllers
const showClientByIdController = new ShowClientByIdController()
const showAllClientsController = new ShowAllClientsController()
const createClientController = new CreateClientController()
const updateClientController = new UpdateClientController()
const deleteClientController = new DeleteClientController()
const deleteAllClientsController = new DeleteAllClientsController()

clientRouter.use(authMiddleware)

clientRouter.get("/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().required()
        }
    })
    , showClientByIdController.handle)

clientRouter.get("/",
    celebrate({
        [Segments.QUERY]: {
            take: Joi.number().integer().required(),
            skip: Joi.number().integer().required(),
        }
    }),
    showAllClientsController.handle)

clientRouter.post('/', 
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string().required().min(3),
            email: Joi.string().required().email(),
            cpf: Joi.string().required().length(11)
        }
    }),
    createClientController.handle
)

clientRouter.put("/:id", 
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string().optional().min(3),
            email: Joi.string().optional().email(),
            cpf: Joi.string().optional().length(11)
        },
        [Segments.PARAMS]: {
            id: Joi.number().integer().required()
        }
    }),
    updateClientController.handle
)

clientRouter.delete("/:id", 
celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().required()
        }
    }),
    deleteClientController.handle
)

clientRouter.delete("/", deleteAllClientsController.handle)

export default clientRouter