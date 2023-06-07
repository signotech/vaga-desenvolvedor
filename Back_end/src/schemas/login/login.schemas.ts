import { z } from "zod";

const loginSchemas = z.object({
   email_user: z.string().email().max(45),
   password_user: z.string().max(120),
});

const adminResponse =  z.object({
   id: z.number().int(),
   email_user: z.string(),
   is_admin: z.boolean().default(true),
   createdAt: z.date(),
   updatedAt: z.date(),
});

export { loginSchemas,adminResponse };
