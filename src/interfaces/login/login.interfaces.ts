import { z } from "zod";
import { loginSchemas } from "../../schemas/login/login.schemas";

type TLoginRequest = z.infer<typeof loginSchemas>;

type Ttoken =  string ;

export { TLoginRequest, Ttoken };
