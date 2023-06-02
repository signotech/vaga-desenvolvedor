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

productsRoutes.delete("/:id", checkValidId, deleteProduct);

export default productsRoutes;
