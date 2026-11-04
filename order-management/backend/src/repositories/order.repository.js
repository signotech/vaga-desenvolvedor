'use strict';

const { Op, literal } = require('sequelize');
const sequelize = require('../models/index');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Client = require('../models/Client');
const User = require('../models/User');
const Product = require('../models/Product');
const { validateSortField, validateSortOrder } = require('../utils/helpers');

const ALLOWED_SORT_FIELDS = [
  'id',
  'order_date',
  'status',
  'discount_percent',
  'created_at',
  'client_name',
  'total',
];
const ORDER_TOTAL_SQL =
  '(SELECT COALESCE(SUM(oi.quantity * oi.unit_price), 0) * (1 - `Order`.`discount_percent` / 100) FROM `order_items` AS oi WHERE oi.order_id = `Order`.`id`)';

class OrderRepository {
  async findAll({
    page = 1,
    limit = 20,
    search,
    sortBy,
    sortOrder,
    status,
    clientId,
    productId,
    dateFrom,
    dateTo,
    totalMin,
    totalMax,
    discountMin,
    discountMax,
  }) {
    const offset = (page - 1) * limit;
    const field = validateSortField(sortBy, ALLOWED_SORT_FIELDS);
    const order = validateSortOrder(sortOrder);

    const where = {};
    if (status) where.status = status;
    if (clientId) where.client_id = clientId;
    if (discountMin !== undefined && discountMin !== '') {
      where.discount_percent = { ...(where.discount_percent || {}), [Op.gte]: Number(discountMin) };
    }
    if (discountMax !== undefined && discountMax !== '') {
      where.discount_percent = { ...(where.discount_percent || {}), [Op.lte]: Number(discountMax) };
    }
    if (dateFrom || dateTo) {
      where.order_date = {};
      if (dateFrom) where.order_date[Op.gte] = new Date(`${dateFrom}T00:00:00`);
      if (dateTo) where.order_date[Op.lte] = new Date(`${dateTo}T23:59:59.999`);
    }

    if (search) {
      const like = sequelize.escape(`%${search}%`);
      where[Op.or] = [
        literal(
          `EXISTS (SELECT 1 FROM clients AS searched_client WHERE searched_client.id = \`Order\`.\`client_id\` AND searched_client.name LIKE ${like})`
        ),
        literal(
          `EXISTS (SELECT 1 FROM order_items AS searched_item INNER JOIN products AS searched_product ON searched_product.id = searched_item.product_id WHERE searched_item.order_id = \`Order\`.\`id\` AND (searched_product.title LIKE ${like} OR searched_product.sku LIKE ${like}))`
        ),
      ];
      if (/^\d+$/.test(String(search))) where[Op.or].push({ id: Number(search) });
    }
    if (totalMin !== undefined && totalMin !== '') {
      where[Op.and] = [...(where[Op.and] || []), literal(`${ORDER_TOTAL_SQL} >= ${Number(totalMin)}`)];
    }
    if (totalMax !== undefined && totalMax !== '') {
      where[Op.and] = [...(where[Op.and] || []), literal(`${ORDER_TOTAL_SQL} <= ${Number(totalMax)}`)];
    }

    const { count, rows } = await Order.findAndCountAll({
      where,
      include: [
        {
          model: Client,
          as: 'client',
          attributes: ['id', 'name', 'email'],
          required: false,
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
        {
          model: OrderItem,
          as: 'items',
          required: Boolean(productId),
          include: [{
            model: Product,
            as: 'product',
            attributes: ['id', 'title', 'sku'],
            where: productId ? { id: productId } : undefined,
            required: Boolean(productId),
          }],
        },
      ],
      order:
        field === 'client_name'
          ? [[{ model: Client, as: 'client' }, 'name', order]]
          : field === 'total'
            ? [
                [
                  literal(ORDER_TOTAL_SQL),
                  order,
                ],
              ]
            : [[field, order]],
      limit,
      offset,
      distinct: true,
    });

    return { orders: rows, total: count };
  }

  async findById(id) {
    return Order.findByPk(id, {
      include: [
        { model: Client, as: 'client', attributes: ['id', 'name', 'cpf', 'email'] },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'title', 'sku', 'price'] }],
        },
      ],
    });
  }

  async create(data, items, transaction) {
    const order = await Order.create(data, { transaction });

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await OrderItem.bulkCreate(orderItems, { transaction });
    return order;
  }

  async update(id, data, items, transaction) {
    const order = await Order.findByPk(id, { transaction });
    if (!order) return null;
    await order.update(data, { transaction });

    if (items) {
      await OrderItem.destroy({ where: { order_id: id }, transaction });
      const orderItems = items.map((item) => ({
        order_id: id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        created_at: new Date(),
        updated_at: new Date(),
      }));
      await OrderItem.bulkCreate(orderItems, { transaction });
    }

    return order;
  }

  async updateStatus(id, status, transaction) {
    const order = await Order.findByPk(id, { transaction, lock: transaction.LOCK.UPDATE });
    if (!order) return null;
    return order.update({ status }, { transaction });
  }

  async findItemsByOrderId(orderId) {
    return OrderItem.findAll({
      where: { order_id: orderId },
      include: [{ model: Product, as: 'product', attributes: ['id', 'title', 'stock'] }],
    });
  }

  async delete(id) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    await order.destroy();
    return order;
  }

  async bulkDelete(ids) {
    const deleted = [];
    const cannotDelete = [];

    for (const id of ids) {
      const order = await Order.findByPk(id);
      if (!order) {
        cannotDelete.push({ id, reason: 'Pedido não encontrado' });
        continue;
      }
      await order.destroy();
      deleted.push({ id, action: 'deleted' });
    }

    return { deleted, cannotDelete };
  }

  /**
   * Busca as estatísticas do painel.
   */
  async getDashboardStats() {
    const [stats] = await sequelize.query(`
      SELECT
        COUNT(*) AS total_orders,
        SUM(CASE WHEN status = 'OPEN' THEN 1 ELSE 0 END) AS open_orders,
        SUM(CASE WHEN status = 'PAID' THEN 1 ELSE 0 END) AS paid_orders,
        SUM(CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END) AS cancelled_orders
      FROM orders
    `);

    const [revenue] = await sequelize.query(`
      SELECT
        COALESCE(
          SUM(
            oi.quantity * oi.unit_price * (1 - o.discount_percent / 100)
          ), 0
        ) AS total_revenue
      FROM orders o
      INNER JOIN order_items oi ON oi.order_id = o.id
      WHERE o.status = 'PAID'
    `);

    const [clientCount] = await sequelize.query(
      'SELECT COUNT(*) AS total FROM clients WHERE deleted_at IS NULL'
    );
    const [productCount] = await sequelize.query(
      'SELECT COUNT(*) AS total FROM products WHERE deleted_at IS NULL'
    );
    const [lowStockCount] = await sequelize.query(
      'SELECT COUNT(*) AS total FROM products WHERE stock <= 5 AND deleted_at IS NULL'
    );

    const [ordersByMonth] = await sequelize.query(`
      SELECT
        DATE_FORMAT(order_date, '%Y-%m') AS month,
        COUNT(*) AS count,
        SUM(CASE WHEN status = 'PAID' THEN
          (SELECT SUM(oi2.quantity * oi2.unit_price) FROM order_items oi2 WHERE oi2.order_id = o.id) * (1 - o.discount_percent/100)
        ELSE 0 END) AS revenue
      FROM orders o
      WHERE order_date >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(order_date, '%Y-%m')
      ORDER BY month ASC
    `);

    const [topProducts] = await sequelize.query(`
      SELECT
        p.id,
        p.title,
        SUM(oi.quantity) AS total_sold
      FROM order_items oi
      INNER JOIN products p ON p.id = oi.product_id
      INNER JOIN orders o ON o.id = oi.order_id
      WHERE o.status = 'PAID'
      GROUP BY p.id, p.title
      ORDER BY total_sold DESC
      LIMIT 5
    `);

    return {
      orders: stats[0],
      revenue: revenue[0],
      clients: clientCount[0],
      products: productCount[0],
      lowStock: lowStockCount[0],
      ordersByMonth,
      topProducts,
    };
  }
}

module.exports = new OrderRepository();
