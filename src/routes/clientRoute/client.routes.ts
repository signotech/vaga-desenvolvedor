import { Router } from "express";
import { postClient, getClient, updateClient, deleteClient } from "../../controllers/clientControllers";
import validBodySchema from "../../middlewares/validBodySchemas";
import { clientSchemaRequest, updateClientSchemaRequest } from "../../schemas/clientSchemas/client.schemas";
import { checkDuplicateValues, checkValidId } from "../../middlewares/clientMiddlewares";



const clientRoutes: Router = Router();

// CRUD without relationships

clientRoutes.post("",checkDuplicateValues,validBodySchema(clientSchemaRequest),postClient);

clientRoutes.get("", getClient);

clientRoutes.patch("/:id",checkValidId,validBodySchema(updateClientSchemaRequest),updateClient);

clientRoutes.delete("/:id",checkValidId,deleteClient);

export default clientRoutes;
