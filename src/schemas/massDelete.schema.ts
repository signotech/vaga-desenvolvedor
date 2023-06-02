import { z } from "zod";

const deleteSchema = z.object({
   massDelete: z.array(z.number())
});

export {deleteSchema}