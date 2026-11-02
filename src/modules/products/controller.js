'use strict';

const service = require('./service');

function formLocals({ product, isEdit, errors = {} }) {
  return {
    title: isEdit ? 'Editar produto' : 'Novo produto',
    product,
    isEdit,
    errors,
    formAction: isEdit ? `/products/${product.id}` : '/products',
  };
}

function renderNotFound(res) {
  return res
    .status(404)
    .render('errors/404', { title: 'Produto não encontrado' });
}

async function index(req, res) {
  const result = await service.list(req.query);

  return res.render('products/index', {
    title: 'Produtos',
    products: result.products,
    pagination: result.pagination,
    current: result.currentSort,
  });
}

function createForm(req, res) {
  return res.render(
    'products/form',
    formLocals({
      product: { sku: '', title: '', price: '', stock: 0 },
      isEdit: false,
    }),
  );
}

async function create(req, res) {
  if (req.validationErrors) {
    return res.status(422).render(
      'products/form',
      formLocals({
        product: { ...req.body },
        isEdit: false,
        errors: req.validationErrors,
      }),
    );
  }

  const product = await service.create(req.body);

  req.flash('success', 'Produto cadastrado com sucesso.');

  return res.redirect(`/products/${product.id}`);
}

async function show(req, res) {
  const { product, items } = await service.findByIdWithOrders(req.params.id);

  if (!product) {
    return renderNotFound(res);
  }

  return res.render('products/show', {
    title: product.title,
    product,
    items,
  });
}

async function editForm(req, res) {
  const product = await service.findById(req.params.id);

  if (!product) {
    return renderNotFound(res);
  }

  return res.render(
    'products/form',
    formLocals({ product, isEdit: true }),
  );
}

async function update(req, res) {
  if (req.validationErrors) {
    return res.status(422).render(
      'products/form',
      formLocals({
        product: { id: req.params.id, ...req.body },
        isEdit: true,
        errors: req.validationErrors,
      }),
    );
  }

  const product = await service.update(req.params.id, req.body);

  if (!product) {
    return renderNotFound(res);
  }

  req.flash('success', 'Produto atualizado com sucesso.');

  return res.redirect('/products');
}

async function destroy(req, res) {
  const result = await service.remove(req.params.id);

  if (result.notFound) {
    req.flash('error', 'Produto não encontrado.');
    return res.redirect('/products');
  }

  if (result.hasOrders) {
    req.flash(
      'error',
      'Não é possível excluir um produto que está em pedidos vinculados.',
    );
    return res.redirect('/products');
  }

  req.flash('success', 'Produto excluído com sucesso.');

  return res.redirect('/products');
}

async function bulkDelete(req, res) {
  const ids = Array.isArray(req.body.ids)
    ? req.body.ids
    : [req.body.ids].filter(Boolean);

  if (ids.length === 0) {
    req.flash('error', 'Selecione ao menos um produto para excluir.');
    return res.redirect('/products');
  }

  const { deleted, skipped } = await service.bulkRemove(ids);

  if (deleted > 0) {
    req.flash('success', `${deleted} produto(s) excluído(s) com sucesso.`);
  }

  if (skipped > 0) {
    req.flash(
      'error',
      `${skipped} produto(s) não puderam ser excluídos por estarem em pedidos.`,
    );
  }

  return res.redirect('/products');
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
