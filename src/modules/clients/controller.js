'use strict';

const service = require('./service');

function formLocals({ client, isEdit, errors = {} }) {
  return {
    title: isEdit ? 'Editar cliente' : 'Novo cliente',
    client,
    isEdit,
    errors,
    formAction: isEdit ? `/clients/${client.id}` : '/clients',
  };
}

function renderNotFound(res) {
  return res
    .status(404)
    .render('errors/404', { title: 'Cliente não encontrado' });
}

async function index(req, res) {
  const result = await service.list(req.query);

  return res.render('clients/index', {
    title: 'Clientes',
    clients: result.clients,
    pagination: result.pagination,
    current: result.currentSort,
  });
}

function createForm(req, res) {
  return res.render(
    'clients/form',
    formLocals({
      client: { name: '', cpf: '', email: '' },
      isEdit: false,
    }),
  );
}

async function create(req, res) {
  if (req.validationErrors) {
    return res.status(422).render(
      'clients/form',
      formLocals({
        client: { ...req.body },
        isEdit: false,
        errors: req.validationErrors,
      }),
    );
  }

  const client = await service.create(req.body);

  req.flash('success', 'Cliente cadastrado com sucesso.');

  return res.redirect(`/clients/${client.id}`);
}

async function show(req, res) {
  const { client, orders } = await service.findByIdWithOrders(req.params.id);

  if (!client) {
    return renderNotFound(res);
  }

  return res.render('clients/show', {
    title: client.name,
    client,
    orders,
  });
}

async function editForm(req, res) {
  const client = await service.findById(req.params.id);

  if (!client) {
    return renderNotFound(res);
  }

  return res.render(
    'clients/form',
    formLocals({ client, isEdit: true }),
  );
}

async function update(req, res) {
  if (req.validationErrors) {
    return res.status(422).render(
      'clients/form',
      formLocals({
        client: { id: req.params.id, ...req.body },
        isEdit: true,
        errors: req.validationErrors,
      }),
    );
  }

  const client = await service.update(req.params.id, req.body);

  if (!client) {
    return renderNotFound(res);
  }

  req.flash('success', 'Cliente atualizado com sucesso.');

  return res.redirect('/clients');
}

async function destroy(req, res) {
  const result = await service.remove(req.params.id);

  if (result.notFound) {
    req.flash('error', 'Cliente não encontrado.');
    return res.redirect('/clients');
  }

  if (result.hasOrders) {
    req.flash(
      'error',
      'Não é possível excluir um cliente que possui pedidos vinculados.',
    );
    return res.redirect('/clients');
  }

  req.flash('success', 'Cliente excluído com sucesso.');

  return res.redirect('/clients');
}

async function bulkDelete(req, res) {
  const ids = Array.isArray(req.body.ids)
    ? req.body.ids
    : [req.body.ids].filter(Boolean);

  if (ids.length === 0) {
    req.flash('error', 'Selecione ao menos um cliente para excluir.');
    return res.redirect('/clients');
  }

  const { deleted, skipped } = await service.bulkRemove(ids);

  if (deleted > 0) {
    req.flash('success', `${deleted} cliente(s) excluído(s) com sucesso.`);
  }

  if (skipped > 0) {
    req.flash(
      'error',
      `${skipped} cliente(s) não puderam ser excluídos por possuírem pedidos.`,
    );
  }

  return res.redirect('/clients');
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
