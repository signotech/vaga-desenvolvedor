import { Router, type IRouter } from "express";
import {
  CreateCustomerBody,
  CreateCustomerResponse,
  DeleteCustomerParams,
  GetCustomerParams,
  GetCustomerResponse,
  ListCustomersQueryParams,
  ListCustomersResponse,
  UpdateCustomerBody,
  UpdateCustomerParams,
  UpdateCustomerResponse,
} from "@workspace/api-zod";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
import { Customer, PurchaseOrder } from "../lib/database";
import { paginateRows, validateListQuery } from "../lib/list-utils";

const router: IRouter = Router();
const customerFields = [
  "id",
  "name",
  "cpf",
  "email",
  "phone",
  "createdAt",
  "updatedAt",
] as const;

function parseId(schema: typeof GetCustomerParams | typeof DeleteCustomerParams, rawId: string | string[]) {
  return schema.safeParse({ id: Array.isArray(rawId) ? rawId[0] : rawId });
}

router.get("/customers", async (req, res): Promise<void> => {
  const parsed = ListCustomersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const invalidField = validateListQuery(parsed.data, customerFields);
  if (invalidField) {
    res.status(400).json({ error: invalidField });
    return;
  }

  const records = await Customer.findAll();
  const result = paginateRows(
    records.map((record) => record.get({ plain: true })),
    parsed.data,
    customerFields,
  );
  res.json(ListCustomersResponse.parse(result));
});

router.post("/customers", async (req, res): Promise<void> => {
  const parsed = CreateCustomerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    const customer = await Customer.create({
      ...parsed.data,
      cpf: parsed.data.cpf.replace(/\D/g, ""),
    });
    res.status(201).json(CreateCustomerResponse.parse(customer.get({ plain: true })));
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      res.status(409).json({ error: "CPF ou e-mail já cadastrado." });
      return;
    }
    throw error;
  }
});

router.get("/customers/:id", async (req, res): Promise<void> => {
  const params = parseId(GetCustomerParams, req.params.id);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const customer = await Customer.findByPk(params.data.id);
  if (!customer) {
    res.status(404).json({ error: "Cliente não encontrado." });
    return;
  }
  res.json(GetCustomerResponse.parse(customer.get({ plain: true })));
});

router.patch("/customers/:id", async (req, res): Promise<void> => {
  const params = parseId(UpdateCustomerParams, req.params.id);
  const body = UpdateCustomerBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({
      error: !params.success ? params.error.message : body.error?.message ?? "Dados inválidos.",
    });
    return;
  }
  const customer = await Customer.findByPk(params.data.id);
  if (!customer) {
    res.status(404).json({ error: "Cliente não encontrado." });
    return;
  }

  try {
    await customer.update({
      ...body.data,
      cpf: body.data.cpf.replace(/\D/g, ""),
    });
    res.json(UpdateCustomerResponse.parse(customer.get({ plain: true })));
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      res.status(409).json({ error: "CPF ou e-mail já cadastrado." });
      return;
    }
    throw error;
  }
});

router.delete("/customers/:id", async (req, res): Promise<void> => {
  const params = parseId(DeleteCustomerParams, req.params.id);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const customer = await Customer.findByPk(params.data.id);
  if (!customer) {
    res.status(404).json({ error: "Cliente não encontrado." });
    return;
  }
  const linkedOrders = await PurchaseOrder.count({
    where: { customerId: customer.id },
  });
  if (linkedOrders > 0) {
    res.status(409).json({
      error: "Este cliente possui pedidos. Exclua os pedidos antes de removê-lo.",
    });
    return;
  }

  try {
    await customer.destroy();
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof ForeignKeyConstraintError) {
      res.status(409).json({ error: "Não é possível excluir este cliente." });
      return;
    }
    throw error;
  }
});

export default router;
