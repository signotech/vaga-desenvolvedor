
import { z } from "zod";

   const orderSchema = z.object({
      id: z.number().int(),
      request_code: z.number().int(),
      request_date:z.union([z.date(), z.string()]),
      request_status: z.string().max(20).default('Em Aberto'),
      client_id: z.number().int(),
      createdAt: z.string(),
      updatedAt: z.string()
   });

   const orderSchemaRequest = orderSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
   });

   const updateOrderRequest = orderSchema
      .omit({
         id: true,
         createdAt: true,
         updatedAt: true,
      })
      .partial();

   export { orderSchema, orderSchemaRequest, updateOrderRequest };