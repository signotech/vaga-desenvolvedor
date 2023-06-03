import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const validBodySchema = (schema: ZodTypeAny) =>
   (req: Request, res: Response, next: NextFunction) => {

      const validBody = schema.parse(req.body);

      req.body = validBody;

      return next();
   };

export default validBodySchema;
