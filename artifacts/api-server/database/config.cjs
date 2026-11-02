const fs = require("node:fs");
const path = require("node:path");

const storage =
  process.env.PURCHASE_ORDERS_DB_STORAGE ??
  path.resolve(__dirname, "..", "data", "purchase-orders.sqlite");

fs.mkdirSync(path.dirname(storage), { recursive: true });

const database = {
  dialect: "sqlite",
  storage,
  logging: false,
};

module.exports = {
  development: database,
  production: database,
  test: database,
};
