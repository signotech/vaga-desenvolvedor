import { z } from "zod";

const productSchema = z.object({
   id: z.number().int(),
   title_product: z.string().max(100),
   sku_product: z.string().max(100),
   price_product: z.union([z.string(), z.number()]),
   stock_product: z.number().int(),
   createdAt: z.string(),
   updatedAt: z.string(),
   product_order_id: z.number().int(),
});

const productSchemaRequest = productSchema.omit({
   id: true,
   createdAt: true,
   updatedAt: true,
});

const updateProductRequest = productSchema
   .omit({
      id: true,
      createdAt: true,
      updatedAt: true,
   })
   .partial();

export { productSchema, productSchemaRequest, updateProductRequest };
