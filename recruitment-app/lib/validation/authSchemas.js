import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
  role: z.enum(["CANDIDATE", "COMPANY", "ADMIN"]).default("CANDIDATE"),
  active: z.boolean().default(true),
});
