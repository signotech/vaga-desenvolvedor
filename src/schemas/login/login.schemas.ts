import { z } from "zod";

const loginSchemas = z.object({
   email_user: z.string().email().max(45),
   password_user: z.string().max(120),
});

export { loginSchemas };
