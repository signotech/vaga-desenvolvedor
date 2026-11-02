'use strict';

const service = require('./service');
const { Client, Product, Order } = require('../../models');
const { toDateTimeLocal } = require('../../helpers/formatters');

async function formOptions() {
  const [clients, products] = await Promise.all([
    Client.findAll({
      order: [['name', 'ASC']],
      attributes: ['id', 'name'],
    }),
    Product.findAll({
      order: [['title', 'ASC']],
      attributes: ['id', 'title', 'price', 'stock'],
    }),
  ]);

  const productIndex = products.reduce((accumulator, product) => {
    accumulator[product.id] = product;
    return accumulator;
  }, {});

  return { clients, products, productIndex };
}

function emptyOrder() {
  return {
    clientId: '',
    status: 'open',
    orderedAt: toDateTimeLocal(new Date()),
    discountType: 'none',
    discountValue: 0,
    items: [{ productId: '', quantity: 1 }],
  };
}

function orderFromBody(body = {}) {
  const items = service.normalizeItems(body.items);

  return {
    clientId: body.client_id || '',
    status: body.status || 'open',
    orderedAt: body.ordered_at || '',
    discountType: body.discount_type || 'none',
    discountValue: body.discount_value ?? 0,
    items: items.length > 0 ? items : [{ productId: '', quantity: 1 }],
  };
}

function orderToForm(order) {
  const items = order.items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    unitPrice: Number(item.unitPrice),
  }));

  return {
    id: order.id,
    clientId: order.clientId,
    status: order.status,
    orderedAt: toDateTimeLocal(order.orderedAt),
    discountType: order.discountType,
    discountValue: Number(order.discountValue),
    items: items.length > 0 ? items : [{ productId: '', quantity: 1 }],
  };
}

async function renderForm(res, { order, isEdit, errors = {}, status = 200 }) {
  const options = await formOptions();

  return res.status(status).render('orders/form', {
    title: isEdit ? `Editar pedido #${order.id}` : 'Novo pedido',
    order,
    isEdit,
    errors,
    formAction: isEdit ? `/orders/${order.id}` : '/orders',
    clients: options.clients,
    products: options.products,
    productIndex: options.productIndex,
    statuses: Order.STATUSES,
    discountTypes: Order.DISCOUNT_TYPES,
  });
}

function renderNotFound(res) {
  return res
    .status(404)
    .render('errors/404', { title: 'Pedido não encontrado' });
}

async function index(req, res) {
  const result = await service.list(req.query);

  return res.render('orders/index', {
    title: 'Pedidos',
    orders: result.orders,
    pagination: result.pagination,
    current: result.currentSort,
    statuses: Order.STATUSES,
  });
}

function createForm(req, res) {
  return renderForm(res, {
    order: emptyOrder(),
    isEdit: false,
  });
}

async function create(req, res) {
  if (req.validationErrors) {
    return renderForm(res, {
      order: orderFromBody(req.body),
      isEdit: false,
      errors: req.validationErrors,
      status: 422,
    });
  }

  const order = await service.create(req.body);

  req.flash('success', 'Pedido cadastrado com sucesso.');

  return res.redirect(`/orders/${order.id}`);
}

async function show(req, res) {
  const order = await service.findByIdWithDetails(req.params.id);

  if (!order) {
    return renderNotFound(res);
  }

  return res.render('orders/show', {
    title: `Pedido #${order.id}`,
    order,
  });
}

async function editForm(req, res) {
  const order = await service.findByIdWithDetails(req.params.id);

  if (!order) {
    return renderNotFound(res);
  }

  return renderForm(res, {
    order: orderToForm(order),
    isEdit: true,
  });
}

async function update(req, res) {
  if (req.validationErrors) {
    return renderForm(res, {
      order: { id: req.params.id, ...orderFromBody(req.body) },
      isEdit: true,
      errors: req.validationErrors,
      status: 422,
    });
  }

  const order = await service.update(req.params.id, req.body);

  if (!order) {
    return renderNotFound(res);
  }

  req.flash('success', 'Pedido atualizado com sucesso.');

  return res.redirect('/orders');
}

async function destroy(req, res) {
  const result = await service.remove(req.params.id);

  if (result.notFound) {
    req.flash('error', 'Pedido não encontrado.');
    return res.redirect('/orders');
  }

  req.flash('success', 'Pedido excluído com sucesso.');

  return res.redirect('/orders');
}

async function bulkDelete(req, res) {
  const ids = Array.isArray(req.body.ids)
    ? req.body.ids
    : [req.body.ids].filter(Boolean);

  if (ids.length === 0) {
    req.flash('error', 'Selecione ao menos um pedido para excluir.');
    return res.redirect('/orders');
  }

  const { deleted } = await service.bulkRemove(ids);

  if (deleted > 0) {
    req.flash('success', `${deleted} pedido(s) excluído(s) com sucesso.`);
  } else {
    req.flash('error', 'Nenhum pedido foi excluído.');
  }

  return res.redirect('/orders');
}

module.exports = {
  index,
  createForm,
  create,
  show,
  editForm,
  update,
  destroy,
  bulkDelete,
};
