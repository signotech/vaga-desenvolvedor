import { Router } from "express";

import {
   postClient,
   getClient,
   updateClient,
   deleteClient,
} from "../../controllers/clientControllers";

import {
   clientSchemaRequest,
   updateClientSchemaRequest,
} from "../../schemas/clientSchemas/client.schemas";

import {
   checkDuplicateValues,
   checkValidId,
   validBodySchemas,
} from "../../middlewares";

const clientRoutes: Router = Router();

clientRoutes.post("",
   checkDuplicateValues,
   validBodySchemas(clientSchemaRequest),
   postClient
);

clientRoutes.get("", getClient);

clientRoutes.patch("/:id",
   checkValidId,
   validBodySchemas(updateClientSchemaRequest),
   updateClient
);

clientRoutes.delete("/:id", checkValidId, deleteClient);

export default clientRoutes;
