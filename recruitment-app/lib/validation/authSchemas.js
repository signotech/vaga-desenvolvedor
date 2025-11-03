import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
  role: z.enum(["CANDIDATE", "COMPANY", "ADMIN"]).default("CANDIDATE"),
  phone: z.string().min(8, { message: "Telefone deve ter pelo menos 8 caracteres" }).max(15, { message: "Telefone deve ter no máximo 15 caracteres" }).optional(),
  bio: z.string().max(1000, { message: "Bio deve ter no máximo 1000 caracteres" }).optional(),
  portfolio: z.string().optional(),
  resumeUrl: z.string().optional(),
  active: z.boolean().default(true),
});
