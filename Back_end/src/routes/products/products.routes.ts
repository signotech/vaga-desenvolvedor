import { Router } from "express";

import {
   productSchemaRequest,
   updateProductRequest,
} from "../../schemas/products/products.schemas";

import {
   deleteProduct,
   getProducts,
   postProduct,
   updateProduct,
} from "../../controllers/products";

import {
   checkDuplicateProduts,
   checkValidId,
   validBodySchemas,
} from "../../middlewares";
import { deleteSchema } from "../../schemas/massDelete.schema";

const productsRoutes: Router = Router();

productsRoutes.post("",
   checkDuplicateProduts,
   validBodySchemas(productSchemaRequest),
   postProduct
);

productsRoutes.get("", getProducts);

productsRoutes.patch("/:id",
   checkValidId,
   validBodySchemas(updateProductRequest),
   updateProduct
);

productsRoutes.delete("",validBodySchemas(deleteSchema) , deleteProduct);

export default productsRoutes;
