import { z } from "zod";

const UserCreateSchema = z.object({
  name: z.string(),
  password: z.string(),
  email: z.string().email({ message: "Forneça um endereço de email válido!" }),
  role: z.string().refine((value) => ["ADMIN", "USER"].includes(value), {
    message: "Role - apenas 'ADMIN' ou 'USER' são valores válidos.",
  }),
});

export { UserCreateSchema };
