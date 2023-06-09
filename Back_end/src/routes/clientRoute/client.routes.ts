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
   convertNullValues,
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
   convertNullValues,
   validBodySchemas(updateClientSchemaRequest),
   updateClient
);

clientRoutes.put("",deleteClient);

export default clientRoutes;
