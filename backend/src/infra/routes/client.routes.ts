import { ShowAllClientsController } from "@infra/controllers/clients/ShowAllClientsController";
import { ShowClientByIdController } from "@infra/controllers/clients/ShowClientByIdController";
import { Segments, celebrate } from "celebrate";
import { Router } from "express";
import Joi from "joi";

const clientRouter = Router()

//Controllers
const showClientByIdController = new ShowClientByIdController()
const showAllClientsController = new ShowAllClientsController()

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

export default clientRouter