import { z } from "zod";

export const jobSchema = z.object({
  title: z
    .string()
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  type: z.enum(["CLT", "PJ", "FREELANCE"]),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(1000, "Descrição deve ter no máximo 1000 caracteres"),
  requirements: z
    .string()
    .max(1000, "Requisitos deve ter no máximo 1000 caracteres")
    .optional(),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  candidates: z.array(z.number().int()).optional(),
  status: z
    .enum(["IN_PROGRESS", "PAUSED", "FINISHED", "CANCELLED"])
    .optional()
    .default("IN_PROGRESS"),
  active: z.boolean().optional().default(true),
});
