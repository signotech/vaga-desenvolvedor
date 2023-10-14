import { z } from "zod";

const AuthLoginSchema = z.object({
  email: z
    .string({ required_error: "Email é obrigatório para essa rota." })
    .email({ message: "Forneça um endereço de email válido." }),
  password: z.string({ required_error: "Obrigatório fornecer senha." }),
});

export { AuthLoginSchema };
