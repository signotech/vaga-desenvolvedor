import { z } from "zod";

const JobCreateSchema = z.object({
  user_id: z.number({
    required_error: "Fornecer o id de quem está criando a vaga.",
  }),
  title: z.string({ required_error: "Obrigatório fornecer o titulo." }),
  description: z.string({
    required_error: "Obrigatório fornecer uma descrição.",
  }),
  type: z
    .string({
      required_error:
        "Obrigatório fornecer tipo da vaga, sendo: 'CLT', 'FREELANCER' ou 'PJ'",
    })
    .refine((value) => ["CLT", "FREELANCER", "PJ"].includes(value), {
      message: "Tipo inválido, forneça algo como: 'CLT', 'FREELANCER' ou 'PJ'",
    }),
});

const JobDeleteSchema = z.object({
  user_id: z.number({
    required_error: "Fornecer o id de quem está deletando a vaga.",
  }),
  id: z.number({
    required_error: "Obrigatório fornecer o id da vaga para requisição.",
  }),
});

export { JobCreateSchema, JobDeleteSchema };
