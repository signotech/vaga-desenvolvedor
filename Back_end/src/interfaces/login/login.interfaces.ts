import { z } from "zod";
import { adminResponse, loginSchemas } from "../../schemas/login/login.schemas";

type TLoginRequest = z.infer<typeof loginSchemas>;

type TloginResponse = z.infer< typeof adminResponse>

type Ttoken =  string ;

export { TLoginRequest, Ttoken,TloginResponse };
