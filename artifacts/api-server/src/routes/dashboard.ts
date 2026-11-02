import { Router, type IRouter } from "express";
import { GetDashboardResponse } from "@workspace/api-zod";
import {
  Customer,
  OrderItem,
  Product,
  PurchaseOrder,
} from "../lib/database";

const router: IRouter = Router();

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

router.get("/dashboard", async (_req, res): Promise<void> => {
  const [
    customerCount,
    productCount,
    orderCount,
    openOrderCount,
    paidOrderCount,
    canceledOrderCount,
    paidOrders,
    recentRecords,
  ] = await Promise.all([
    Customer.count(),
    Product.count(),
    PurchaseOrder.count(),
    PurchaseOrder.count({ where: { status: "open" } }),
    PurchaseOrder.count({ where: { status: "paid" } }),
    PurchaseOrder.count({ where: { status: "canceled" } }),
    PurchaseOrder.findAll({
      where: { status: "paid" },
      include: [{ model: OrderItem, as: "items" }],
    }),
    PurchaseOrder.findAll({
      order: [["orderDate", "DESC"]],
      limit: 5,
      include: [
        { model: Customer, as: "customer" },
        { model: OrderItem, as: "items" },
      ],
    }),
  ]);

  const paidTotal = paidOrders.reduce((sum, order) => {
    const orderTotal = (order.items ?? []).reduce(
      (subtotal, item) =>
        subtotal + Number(item.unitPrice) * Number(item.quantity),
      0,
    );
    return sum + orderTotal;
  }, 0);

  const recentOrders = recentRecords.map((order) => {
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
  });

  res.json(
    GetDashboardResponse.parse({
      customerCount,
      productCount,
      orderCount,
      openOrderCount,
      paidOrderCount,
      canceledOrderCount,
      paidTotal: roundMoney(paidTotal),
      recentOrders,
    }),
  );
});

export default router;
