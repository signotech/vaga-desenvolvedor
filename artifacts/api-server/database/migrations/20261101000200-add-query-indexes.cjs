"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex("customers", ["name"]);
    await queryInterface.addIndex("products", ["title"]);
    await queryInterface.addIndex("purchase_orders", ["customer_id"]);
    await queryInterface.addIndex("purchase_orders", ["order_date"]);
    await queryInterface.addIndex("purchase_orders", ["status"]);
    await queryInterface.addIndex("order_items", ["order_id"]);
    await queryInterface.addIndex("order_items", ["product_id"]);
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("order_items", ["product_id"]);
    await queryInterface.removeIndex("order_items", ["order_id"]);
    await queryInterface.removeIndex("purchase_orders", ["status"]);
    await queryInterface.removeIndex("purchase_orders", ["order_date"]);
    await queryInterface.removeIndex("purchase_orders", ["customer_id"]);
    await queryInterface.removeIndex("products", ["title"]);
    await queryInterface.removeIndex("customers", ["name"]);
  },
};
