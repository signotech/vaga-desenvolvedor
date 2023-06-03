import { z } from "zod";
import {
   productSchema,
   productSchemaRequest,
} from "../../schemas/products/products.schemas";

type TProductResponse = z.infer<typeof productSchema>;

type TProductRequest = z.infer<typeof productSchemaRequest>;

type  TProductUpdateRequest = Partial<TProductRequest>;

export { TProductRequest, TProductResponse, TProductUpdateRequest };
