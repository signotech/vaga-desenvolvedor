'use strict';

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/database');
const { roundMoney } = require('../helpers/money');

const STATUSES = ['open', 'paid', 'canceled'];
const DISCOUNT_TYPES = ['none', 'fixed', 'percent'];

class Order extends Model {
  /**
   * Calcula subtotal, desconto e total a partir dos itens do pedido.
   * O desconto percentual é limitado a 100% e o desconto fixo ao subtotal,
   * garantindo que o total nunca seja negativo.
   */
  static calculateTotals(items = [], discountType = 'none', discountValue = 0) {
    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.unitPrice),
      0,
    );

    const value = Math.max(Number(discountValue) || 0, 0);
    let discountAmount = 0;

    if (discountType === 'percent') {
      discountAmount = subtotal * (Math.min(value, 100) / 100);
    }

    if (discountType === 'fixed') {
      discountAmount = Math.min(value, subtotal);
    }

    return {
      subtotal: roundMoney(subtotal),
      discountAmount: roundMoney(discountAmount),
      total: roundMoney(subtotal - discountAmount),
    };
  }
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...STATUSES),
      allowNull: false,
      defaultValue: 'open',
      validate: {
        isIn: [STATUSES],
      },
    },
    orderedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    discountType: {
      type: DataTypes.ENUM(...DISCOUNT_TYPES),
      allowNull: false,
      defaultValue: 'none',
      validate: {
        isIn: [DISCOUNT_TYPES],
      },
    },
    discountValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    subtotal: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.items) {
          return null;
        }

        return Order.calculateTotals(
          this.items,
          this.discountType,
          this.discountValue,
        ).subtotal;
      },
    },
    discountAmount: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.items) {
          return null;
        }

        return Order.calculateTotals(
          this.items,
          this.discountType,
          this.discountValue,
        ).discountAmount;
      },
    },
    total: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.items) {
          return null;
        }

        return Order.calculateTotals(
          this.items,
          this.discountType,
          this.discountValue,
        ).total;
      },
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    underscored: true,
  },
);

Order.STATUSES = STATUSES;
Order.DISCOUNT_TYPES = DISCOUNT_TYPES;

module.exports = Order;
