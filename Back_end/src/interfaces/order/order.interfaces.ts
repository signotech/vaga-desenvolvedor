import { z } from "zod";

import { orderSchema, orderSchemaRequest } from "../../schemas/order/order.schemas";

type TOrderResponse = z.infer<typeof orderSchema >;

type TOrderRequest = z.infer<typeof orderSchemaRequest>;

type  TOrderUpdateRequest = Partial<TOrderRequest>;

export { TOrderResponse, TOrderRequest, TOrderUpdateRequest  };
