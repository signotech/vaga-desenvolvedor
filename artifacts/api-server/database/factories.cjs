"use strict";

function customerFactory(overrides = {}) {
  return {
    name: "Marina Costa",
    cpf: "123.456.789-01",
    email: "marina@example.com",
    phone: "(11) 99999-1111",
    ...overrides,
  };
}

function productFactory(overrides = {}) {
  return {
    sku: "TEC-001",
    title: "Teclado mecânico",
    price: 289.9,
    stock: 18,
    ...overrides,
  };
}

function orderFactory(overrides = {}) {
  return {
    customerId: 1,
    orderDate: new Date("2026-10-28T14:30:00.000Z"),
    status: "open",
    ...overrides,
  };
}

function orderItemFactory(overrides = {}) {
  return {
    orderId: 1,
    productId: 1,
    quantity: 1,
    unitPrice: 289.9,
    ...overrides,
  };
}

module.exports = {
  customerFactory,
  productFactory,
  orderFactory,
  orderItemFactory,
};
