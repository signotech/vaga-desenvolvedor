import { z } from "zod";
import {
   productSchema,
   productSchemaRequest,
} from "../../schemas/products/products.schemas";

type TOrderResponse = z.infer<typeof productSchema>;

type TOrderRequest = z.infer<typeof productSchemaRequest>;

type  TOrderUpdateRequest = Partial<TOrderRequest>;

export { TOrderResponse, TOrderRequest, TOrderUpdateRequest  };
