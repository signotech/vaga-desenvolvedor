import { NextApiResponse } from "next";
import { ZodError, z } from "zod";

export async function controllerCall(
  res: NextApiResponse,
  params: {
    service: () => any;
    message?: string;
    code?: number;
    schema?: z.Schema;
    schemaData?: Object;
  }
) {
  const { service, code, message, schema, schemaData } = params;
  try {
    if ((schema && !schemaData) || (schemaData && !schema))
      throw Error("Params - schema e schemaData são dependentes.");

    if (schema) schema.parse(schemaData);

    const data = await service();

    return res.status(code || 200).json({ message, data });
  } catch (error) {
    catchErrorController(res, error);
  }
}

export function catchErrorController(res: NextApiResponse, error: unknown) {
  if (error instanceof Error) {
    error = error.message;
  }

  if (typeof error == "string" && error.includes("message")) {
    error = JSON.parse(error.toString())[0].message;
  }

  return res.status(500).json({ error });
}
