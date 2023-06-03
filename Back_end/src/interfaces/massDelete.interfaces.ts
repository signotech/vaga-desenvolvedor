import {z} from "zod"
import { deleteSchema } from "../schemas/massDelete.schema";

type TdeleteSchema = z.infer<typeof deleteSchema>;

export {TdeleteSchema}