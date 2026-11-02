"use strict";

const { QueryTypes } = require("sequelize");
const {
  customerFactory,
  productFactory,
  orderFactory,
  orderItemFactory,
} = require("../factories.cjs");

const toDatabaseColumns = (record) =>
  Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
      value,
    ]),
  );

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const timestamped = (record) => ({
      ...toDatabaseColumns(record),
      created_at: now,
      updated_at: now,
    });

    const [customerCount] = await queryInterface.sequelize.query(
      "SELECT COUNT(*) AS count FROM customers",
      { type: QueryTypes.SELECT },
    );
    if (Number(customerCount.count) === 0) {
      await queryInterface.bulkInsert("customers", [
        timestamped(
          customerFactory({
            id: 1,
            name: "Marina Costa",
            cpf: "123.456.789-01",
            email: "marina@example.com",
          }),
        ),
        timestamped(
          customerFactory({
            id: 2,
            name: "Rafael Almeida",
            cpf: "234.567.890-12",
            email: "rafael@example.com",
            phone: "(21) 98888-2222",
          }),
        ),
        timestamped(
          customerFactory({
            id: 3,
            name: "Bianca Santos",
            cpf: "345.678.901-23",
            email: "bianca@example.com",
            phone: null,
          }),
        ),
      ]);
    }

    const [productCount] = await queryInterface.sequelize.query(
      "SELECT COUNT(*) AS count FROM products",
      { type: QueryTypes.SELECT },
    );
    if (Number(productCount.count) === 0) {
      await queryInterface.bulkInsert("products", [
        timestamped(
          productFactory({
            id: 1,
            sku: "TEC-001",
            title: "Teclado mecânico",
            price: 289.9,
            stock: 18,
          }),
        ),
        timestamped(
          productFactory({
            id: 2,
            sku: "MON-024",
            title: "Monitor 24 polegadas",
            price: 1099,
            stock: 7,
          }),
        ),
        timestamped(
          productFactory({
            id: 3,
            sku: "MOU-003",
            title: "Mouse sem fio",
            price: 149.5,
            stock: 32,
          }),
        ),
      ]);
    }

    const [orderCount] = await queryInterface.sequelize.query(
      "SELECT COUNT(*) AS count FROM purchase_orders",
      { type: QueryTypes.SELECT },
    );
    if (Number(orderCount.count) === 0) {
      await queryInterface.bulkInsert("purchase_orders", [
        timestamped(
          orderFactory({
            id: 1,
            customerId: 1,
            orderDate: new Date("2026-10-28T14:30:00.000Z"),
            status: "paid",
          }),
        ),
        timestamped(
          orderFactory({
            id: 2,
            customerId: 2,
            orderDate: new Date("2026-10-30T10:15:00.000Z"),
            status: "open",
          }),
        ),
        timestamped(
          orderFactory({
            id: 3,
            customerId: 3,
            orderDate: new Date("2026-10-31T16:00:00.000Z"),
            status: "canceled",
          }),
        ),
      ]);

      await queryInterface.bulkInsert("order_items", [
        timestamped(
          orderItemFactory({
            id: 1,
            orderId: 1,
            productId: 1,
            quantity: 2,
            unitPrice: 289.9,
          }),
        ),
        timestamped(
          orderItemFactory({
            id: 2,
            orderId: 1,
            productId: 3,
            quantity: 1,
            unitPrice: 149.5,
          }),
        ),
        timestamped(
          orderItemFactory({
            id: 3,
            orderId: 2,
            productId: 2,
            quantity: 1,
            unitPrice: 1099,
          }),
        ),
        timestamped(
          orderItemFactory({
            id: 4,
            orderId: 3,
            productId: 3,
            quantity: 1,
            unitPrice: 149.5,
          }),
        ),
      ]);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("order_items", null, {});
    await queryInterface.bulkDelete("purchase_orders", null, {});
    await queryInterface.bulkDelete("products", null, {});
    await queryInterface.bulkDelete("customers", null, {});
  },
};
