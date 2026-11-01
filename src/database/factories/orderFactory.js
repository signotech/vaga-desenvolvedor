'use strict';

const { roundMoney } = require('../../helpers/money');

function buildOrderItem(product, quantity = 1) {
  return {
    productId: product.id,
    quantity,
    unitPrice: roundMoney(product.price),
  };
}

function buildOrder({
  clientId,
  orderedAt = new Date(),
  status = 'open',
  discountType = 'none',
  discountValue = 0,
} = {}) {
  return {
    clientId,
    orderedAt,
    status,
    discountType,
    discountValue,
  };
}

module.exports = { buildOrder, buildOrderItem };
