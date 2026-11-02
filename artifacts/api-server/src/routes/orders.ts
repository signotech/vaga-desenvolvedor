import { Router, type IRouter } from "express";
import {
  CreateOrderBody,
  CreateOrderResponse,
  DeleteOrderParams,
  GetOrderParams,
  GetOrderResponse,
  ListOrdersQueryParams,
  ListOrdersResponse,
  UpdateOrderBody,
  UpdateOrderParams,
  UpdateOrderResponse,
} from "@workspace/api-zod";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
import {
  Customer,
  OrderItem,
  Product,
  PurchaseOrder,
  sequelize,
} from "../lib/database";
import { paginateRows, validateListQuery } from "../lib/list-utils";

const router: IRouter = Router();
const orderFields = [
  "id",
  "customerId",
  "customerName",
  "orderDate",
  "status",
  "itemCount",
  "total",
  "createdAt",
  "updatedAt",
] as const;

function parseId(
  schema:
    | typeof GetOrderParams
    | typeof UpdateOrderParams
    | typeof DeleteOrderParams,
  rawId: string | string[],
) {
  return schema.safeParse({ id: Array.isArray(rawId) ? rawId[0] : rawId });
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function orderSummary(order: PurchaseOrder) {
  const items = order.items ?? [];
  const total = items.reduce(
    (sum, item) => sum + Number(item.unitPrice) * item.quantity,
    0,
  );

  return {
    id: order.id,
    customerId: order.customerId,
    customerName: order.customer?.name ?? "",
    orderDate: order.orderDate,
    status: order.status,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    total: roundMoney(total),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}

function orderDetail(order: PurchaseOrder) {
  return {
    ...orderSummary(order),
    items: (order.items ?? []).map((item) => ({
      id: item.id,
      productId: item.productId,
      sku: item.product?.sku ?? "",
      productTitle: item.product?.title ?? "",
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      lineTotal: roundMoney(Number(item.unitPrice) * item.quantity),
    })),
  };
}

async function findOrder(id: number): Promise<PurchaseOrder | null> {
  return PurchaseOrder.findByPk(id, {
    include: [
      { model: Customer, as: "customer" },
      {
        model: OrderItem,
        as: "items",
        include: [{ model: Product, as: "product" }],
      },
    ],
  });
}

async function replaceOrderItems(
  order: PurchaseOrder,
  items: Array<{ productId: number; quantity: number }>,
  transaction: Awaited<ReturnType<typeof sequelize.transaction>>,
): Promise<void> {
  const previousItems = await OrderItem.findAll({
    where: { orderId: order.id },
    transaction,
  });
  const previousPrices = new Map(
    previousItems.map((item) => [item.productId, Number(item.unitPrice)]),
  );
  const productIds = [...new Set(items.map((item) => item.productId))];
  const products = await Product.findAll({
    where: { id: productIds },
    transaction,
  });
  const productsById = new Map(products.map((product) => [product.id, product]));
  if (productsById.size !== productIds.length) {
    throw new Error("Um ou mais produtos não foram encontrados.");
  }

  await OrderItem.destroy({ where: { orderId: order.id }, transaction });
  await OrderItem.bulkCreate(
    items.map((item) => {
      const product = productsById.get(item.productId);
      if (!product) throw new Error("Produto não encontrado.");
      return {
        orderId: order.id,
        productId: product.id,
        quantity: item.quantity,
        unitPrice: previousPrices.get(product.id) ?? Number(product.price),
      };
    }),
    { transaction },
  );
}

router.get("/orders", async (req, res): Promise<void> => {
  const parsed = ListOrdersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const invalidField = validateListQuery(parsed.data, orderFields);
  if (invalidField) {
    res.status(400).json({ error: invalidField });
    return;
  }

  const orders = await PurchaseOrder.findAll({
    include: [
      { model: Customer, as: "customer" },
      { model: OrderItem, as: "items" },
    ],
  });
  const result = paginateRows(
    orders.map(orderSummary) as Array<Record<string, unknown>>,
    parsed.data,
    orderFields,
  );
  res.json(ListOrdersResponse.parse(result));
});

router.post("/orders", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const customer = await Customer.findByPk(parsed.data.customerId);
  if (!customer) {
    res.status(404).json({ error: "Cliente não encontrado." });
    return;
  }

  try {
    const order = await sequelize.transaction(async (transaction) => {
      const created = await PurchaseOrder.create(
        {
          customerId: parsed.data.customerId,
          orderDate: parsed.data.orderDate,
          status: parsed.data.status,
        },
        { transaction },
      );
      await replaceOrderItems(created, parsed.data.items, transaction);
      return created;
    });
    const complete = await findOrder(order.id);
    if (!complete) {
      res.status(500).json({ error: "Não foi possível carregar o pedido criado." });
      return;
    }
    res.status(201).json(
      CreateOrderResponse.parse(orderDetail(complete)),
    );
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      res.status(409).json({ error: "Não foi possível salvar os itens do pedido." });
      return;
    }
    if (error instanceof ForeignKeyConstraintError) {
      res.status(404).json({ error: "Cliente ou produto não encontrado." });
      return;
    }
    if (error instanceof Error && error.message.includes("produto")) {
      res.status(404).json({ error: error.message });
      return;
    }
    throw error;
  }
});

router.get("/orders/:id", async (req, res): Promise<void> => {
  const params = parseId(GetOrderParams, req.params.id);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const order = await findOrder(params.data.id);
  if (!order) {
    res.status(404).json({ error: "Pedido não encontrado." });
    return;
  }
  res.json(GetOrderResponse.parse(orderDetail(order)));
});

router.patch("/orders/:id", async (req, res): Promise<void> => {
  const params = parseId(UpdateOrderParams, req.params.id);
  const body = UpdateOrderBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({
      error: !params.success ? params.error.message : body.error?.message ?? "Dados inválidos.",
    });
    return;
  }

  const existing = await PurchaseOrder.findByPk(params.data.id);
  if (!existing) {
    res.status(404).json({ error: "Pedido não encontrado." });
    return;
  }
  const customer = await Customer.findByPk(body.data.customerId);
  if (!customer) {
    res.status(404).json({ error: "Cliente não encontrado." });
    return;
  }

  try {
    await sequelize.transaction(async (transaction) => {
      await existing.update(
        {
          customerId: body.data.customerId,
          orderDate: body.data.orderDate,
          status: body.data.status,
        },
        { transaction },
      );
      await replaceOrderItems(existing, body.data.items, transaction);
    });
    const complete = await findOrder(existing.id);
    if (!complete) {
      res.status(500).json({ error: "Não foi possível carregar o pedido atualizado." });
      return;
    }
    res.json(UpdateOrderResponse.parse(orderDetail(complete)));
  } catch (error) {
    if (error instanceof ForeignKeyConstraintError) {
      res.status(404).json({ error: "Cliente ou produto não encontrado." });
      return;
    }
    if (error instanceof Error && error.message.includes("produto")) {
      res.status(404).json({ error: error.message });
      return;
    }
    throw error;
  }
});

router.delete("/orders/:id", async (req, res): Promise<void> => {
  const params = parseId(DeleteOrderParams, req.params.id);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const order = await PurchaseOrder.findByPk(params.data.id);
  if (!order) {
    res.status(404).json({ error: "Pedido não encontrado." });
    return;
  }
  try {
    await sequelize.transaction(async (transaction) => {
      await OrderItem.destroy({ where: { orderId: order.id }, transaction });
      await order.destroy({ transaction });
    });
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof ForeignKeyConstraintError) {
      res.status(409).json({ error: "Não foi possível excluir este pedido." });
      return;
    }
    throw error;
  }
});

export default router;
