import { z } from "zod";

const clientSchema = z.object({
   id: z.number().int(),
   name_client: z.string().max(150),
   cpf_client: z.string().max(11),
   email_client: z.string().email(),
   createdAt: z.string(),
   updatedAt: z.string(),
});

const clientSchemaRequest = clientSchema.omit({
   id: true,
   createdAt: true,
   updatedAt: true,
});

const updateClientSchemaRequest = clientSchema.omit({ id: true }).partial();


export { clientSchema, clientSchemaRequest, updateClientSchemaRequest};
