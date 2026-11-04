/**
 * OrderFlow — Página de Pedidos
 */

if (!Auth.requireAuth()) throw new Error('Redirect');
Components.renderSidebar('orders');

const state = {
  page: 1,
  limit: 20,
  search: '',
  clientId: '',
  productId: '',
  status: '',
  dateFrom: '',
  dateTo: '',
  totalMin: '',
  totalMax: '',
  discountMin: '',
  discountMax: '',
  sortBy: 'order_date',
  sortOrder: 'DESC',
  selected: new Set(),
  clients: [],
  products: [],
};
let orderModal;
let searchTimer;

document.addEventListener('DOMContentLoaded', async () => {
  M.Modal.init(document.querySelectorAll('.modal'));
  orderModal = M.Modal.getInstance(document.getElementById('orderModal'));
  bindEvents();
  await loadLookups();
  const params = new URLSearchParams(window.location.search);
  if (params.get('search')) {
    state.search = params.get('search');
    document.getElementById('searchInput').value = state.search;
  }
  if (params.get('clientId')) {
    state.clientId = params.get('clientId');
    if (!state.clients.some((client) => Number(client.id) === Number(state.clientId))) {
      try {
        const { data: client } = await Api.get(`/clients/${Number(state.clientId)}`);
        ensureClientOption(client);
      } catch (error) {
        Components.toast(`Não foi possível carregar o cliente do filtro: ${error.message}`, 'error');
      }
    }
    document.getElementById('clientFilter').value = state.clientId;
    Components.refreshSelect(document.getElementById('clientFilter'));
  }
  await loadOrders();
  if (params.get('edit')) await openEdit(Number(params.get('edit')));
  else if (params.get('new') === '1') openCreate();
});

async function loadLookups() {
  const errors = [];
  try {
    const [clientResponse, productResponse] = await Promise.all([
      Api.getQuery('/clients', { page: 1, limit: 100, sortBy: 'name', sortOrder: 'ASC' }),
      Api.getQuery('/products', { page: 1, limit: 100, sortBy: 'title', sortOrder: 'ASC' }),
    ]);
    state.clients = clientResponse.data || [];
    state.products = productResponse.data || [];
  } catch (error) {
    errors.push(error.message);
  }
  populateClientSelects();
  if (errors.length) Components.toast(`Não foi possível carregar listas auxiliares: ${errors.join('; ')}`, 'error');
}

function populateClientSelects() {
  const options = state.clients.map((client) =>
    `<option value="${Number(client.id)}">${Components.escapeHtml(client.name)} — ${Components.escapeHtml(client.email)}</option>`
  ).join('');
  document.getElementById('clientFilter').insertAdjacentHTML('beforeend', options);
  document.getElementById('fieldClient').insertAdjacentHTML('beforeend', options);
  const productOptions = state.products.map((product) =>
    `<option value="${Number(product.id)}">${Components.escapeHtml(product.title)} — ${Components.escapeHtml(product.sku)}</option>`
  ).join('');
  document.getElementById('productFilter').insertAdjacentHTML('beforeend', productOptions);
  document.querySelectorAll('select').forEach((select) => Components.refreshSelect(select));
}

function queryParams() {
  return {
    page: state.page,
    limit: state.limit,
    search: state.search,
    clientId: state.clientId,
    productId: state.productId,
    status: state.status,
    dateFrom: state.dateFrom,
    dateTo: state.dateTo,
    totalMin: state.totalMin,
    totalMax: state.totalMax,
    discountMin: state.discountMin,
    discountMax: state.discountMax,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
  };
}

async function loadOrders() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state">Carregando pedidos…</div></td></tr>';
  try {
    const response = await Api.getQuery('/orders', queryParams());
    renderOrders(response.data || []);
    Components.renderPagination('paginationContainer', response.meta, (page) => {
      state.page = page;
      loadOrders();
    });
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state">${Components.escapeHtml(error.message)}</div></td></tr>`;
  }
}

function renderOrders(orders) {
  const tbody = document.getElementById('tableBody');
  if (!orders.length) {
    tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state"><i class="material-icons">receipt_long</i><p>Nenhum pedido encontrado</p></div></td></tr>';
    return;
  }
  tbody.innerHTML = orders.map((order) => {
    const id = Number(order.id);
    return `<tr>
      <td><label><input type="checkbox" class="row-check" data-id="${id}" ${state.selected.has(id) ? 'checked' : ''} /><span></span></label></td>
      <td><a href="/pages/order-details.html?id=${id}" class="blue-text">#${id}</a></td>
      <td><a href="/pages/clients.html?id=${Number(order.client.id)}" class="blue-text">${Components.escapeHtml(order.client.name)}</a></td>
      <td>${(order.items || []).map((item) => `<a class="order-product-link" href="/pages/products.html?id=${Number(item.product_id)}">${Components.escapeHtml(item.product?.title || `#${item.product_id}`)}</a>`).join(', ') || '—'}</td>
      <td>${Components.formatDateTime(order.order_date)}</td>
      <td>${Components.statusBadge(order.status)}</td>
      <td>${Number(order.discount_percent).toLocaleString('pt-BR')}%</td>
      <td>${Components.formatCurrency(order.total)}</td>
      <td><div class="actions">
        <a class="btn-icon view" href="/pages/order-details.html?id=${id}" aria-label="Ver pedido"><i class="material-icons">visibility</i></a>
        ${order.status === 'OPEN' ? `<button class="btn-icon edit" data-action="edit" data-id="${id}" aria-label="Editar pedido"><i class="material-icons">edit</i></button>` : ''}
        <button class="btn-icon delete" data-action="delete" data-id="${id}" aria-label="Excluir pedido"><i class="material-icons">delete</i></button>
      </div></td>
    </tr>`;
  }).join('');

  tbody.querySelectorAll('.row-check').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const id = Number(checkbox.dataset.id);
      checkbox.checked ? state.selected.add(id) : state.selected.delete(id);
      updateSelection();
    });
  });
  tbody.querySelectorAll('[data-action="edit"]').forEach((button) => {
    button.addEventListener('click', () => openEdit(Number(button.dataset.id)));
  });
  tbody.querySelectorAll('[data-action="delete"]').forEach((button) => {
    button.addEventListener('click', () => deleteOrder(Number(button.dataset.id)));
  });
  document.getElementById('selectAll').checked = false;
  updateSelection();
}

function updateSelection() {
  document.getElementById('selectionCount').textContent = `${state.selected.size} selecionado(s)`;
  document.getElementById('selectionBar').classList.toggle('visible', state.selected.size > 0);
}

function openCreate() {
  document.getElementById('orderForm').reset();
  document.getElementById('orderId').value = '';
  document.getElementById('fieldDiscount').value = '0';
  document.getElementById('modalTitle').textContent = 'Novo Pedido';
  document.getElementById('formErrors').textContent = '';
  document.getElementById('itemRows').innerHTML = '';
  addItemRow();
  M.updateTextFields();
  Components.refreshSelect(document.getElementById('fieldClient'));
  orderModal.open();
}

async function openEdit(id) {
  try {
    const { data: order } = await Api.get(`/orders/${id}`);
    if (order.status !== 'OPEN') {
      Components.toast('Somente pedidos em aberto podem ser editados.', 'warning');
      return;
    }
    if (!state.clients.some((client) => Number(client.id) === Number(order.client_id))) {
      ensureClientOption(order.client);
    }
    document.getElementById('orderForm').reset();
    document.getElementById('orderId').value = order.id;
    document.getElementById('fieldClient').value = String(order.client_id);
    document.getElementById('fieldDiscount').value = order.discount_percent;
    document.getElementById('fieldOrderDate').value = new Date(order.order_date).toISOString().slice(0, 16);
    document.getElementById('modalTitle').textContent = `Editar Pedido #${order.id}`;
    document.getElementById('formErrors').textContent = '';
    document.getElementById('itemRows').innerHTML = '';
    (order.items || []).forEach((item) => {
      if (item.product && !state.products.some((product) => Number(product.id) === Number(item.product_id))) {
        state.products.push(item.product);
      }
      addItemRow(item.product_id, item.quantity);
    });
    recalculate();
    M.updateTextFields();
    Components.refreshSelect(document.getElementById('fieldClient'));
    orderModal.open();
  } catch (error) {
    Components.toast(`Não foi possível carregar o pedido: ${error.message}`, 'error');
  }
}

function ensureClientOption(client) {
  if (!client || state.clients.some((item) => Number(item.id) === Number(client.id))) return;
  state.clients.push(client);
  const option = document.createElement('option');
  option.value = String(client.id);
  option.textContent = `${client.name} — ${client.email || ''}`;
  document.getElementById('fieldClient').appendChild(option);
  const filterOption = option.cloneNode(true);
  document.getElementById('clientFilter').appendChild(filterOption);
}

function addItemRow(productId = '', quantity = 1) {
  const tbody = document.getElementById('itemRows');
  const row = document.createElement('tr');
  const productOptions = state.products.map((product) =>
    `<option value="${Number(product.id)}" ${Number(product.id) === Number(productId) ? 'selected' : ''}>${Components.escapeHtml(product.title)} (${Components.escapeHtml(product.sku)})</option>`
  ).join('');
  row.innerHTML = `<td><select class="item-product"><option value="" disabled ${productId ? '' : 'selected'}>Selecione…</option>${productOptions}</select></td>
    <td class="item-price">—</td>
    <td><input class="item-quantity" type="number" min="1" step="1" value="${Number(quantity) || 1}" aria-label="Quantidade" /></td>
    <td class="item-subtotal">—</td>
    <td><button type="button" class="btn-icon delete remove-item" aria-label="Remover item"><i class="material-icons">close</i></button></td>`;
  tbody.appendChild(row);
  Components.refreshSelect(row.querySelector('.item-product'));
  row.querySelector('.item-product').addEventListener('change', recalculate);
  row.querySelector('.item-quantity').addEventListener('input', recalculate);
  row.querySelector('.remove-item').addEventListener('click', () => {
    row.remove();
    recalculate();
  });
  recalculate();
}

function recalculate() {
  const rows = [...document.querySelectorAll('#itemRows tr')];
  document.getElementById('orderEmptyItems').style.display = rows.length ? 'none' : 'block';
  let subtotalCents = 0;
  rows.forEach((row) => {
    const productId = Number(row.querySelector('.item-product').value);
    const product = state.products.find((item) => Number(item.id) === productId);
    const quantity = Math.max(0, Number(row.querySelector('.item-quantity').value) || 0);
    const priceCents = product ? Math.round(Number(product.price) * 100) : 0;
    const lineCents = priceCents * quantity;
    subtotalCents += lineCents;
    row.querySelector('.item-price').textContent = product ? Components.formatCurrency(product.price) : '—';
    row.querySelector('.item-subtotal').textContent = product ? Components.formatCurrency(lineCents / 100) : '—';
  });
  const discount = Math.min(100, Math.max(0, Number(document.getElementById('fieldDiscount').value) || 0));
  const discountCents = Math.round(subtotalCents * discount / 100);
  document.getElementById('summarySubtotal').textContent = Components.formatCurrency(subtotalCents / 100);
  document.getElementById('summaryDiscount').textContent = `− ${Components.formatCurrency(discountCents / 100)}`;
  document.getElementById('summaryTotal').textContent = Components.formatCurrency((subtotalCents - discountCents) / 100);
}

async function saveOrder() {
  const id = document.getElementById('orderId').value;
  const errors = document.getElementById('formErrors');
  const button = document.getElementById('btnSave');
  const rows = [...document.querySelectorAll('#itemRows tr')];
  const items = rows.map((row) => ({
    product_id: Number(row.querySelector('.item-product').value),
    quantity: Number(row.querySelector('.item-quantity').value),
  }));
  const clientId = Number(document.getElementById('fieldClient').value);
  const discount = Number(document.getElementById('fieldDiscount').value);
  const dateValue = document.getElementById('fieldOrderDate').value;
  errors.textContent = '';

  if (!clientId || !items.length || items.some((item) => !item.product_id || !Number.isInteger(item.quantity) || item.quantity < 1)) {
    errors.textContent = 'Selecione um cliente e pelo menos um produto com quantidade inteira maior que zero.';
    return;
  }
  if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
    errors.textContent = 'O desconto deve estar entre 0% e 100%.';
    return;
  }
  if (new Set(items.map((item) => item.product_id)).size !== items.length) {
    errors.textContent = 'Remova produtos duplicados. Cada produto deve aparecer uma única vez.';
    return;
  }

  const payload = {
    client_id: clientId,
    discount_percent: discount,
    items,
    ...(dateValue ? { order_date: new Date(dateValue).toISOString() } : {}),
  };
  button.disabled = true;
  try {
    if (id) {
      await Api.put(`/orders/${id}`, payload);
      Components.toast('Pedido atualizado com sucesso.', 'success');
    } else {
      await Api.post('/orders', payload);
      Components.toast('Pedido criado com sucesso.', 'success');
    }
    orderModal.close();
    state.page = 1;
    await loadOrders();
  } catch (error) {
    errors.textContent = error.errors
      ? error.errors.map((item) => item.message).join(', ')
      : error.message;
  } finally {
    button.disabled = false;
  }
}

async function deleteOrder(id) {
  if (!await Components.confirm('Excluir pedido?', 'Pedidos pagos não podem ser excluídos.')) return;
  try {
    const response = await Api.delete(`/orders/${id}`);
    Components.toast(response.message || 'Pedido excluído.', 'success');
    state.selected.delete(id);
    await loadOrders();
  } catch (error) {
    Components.toast(`Não foi possível excluir o pedido: ${error.message}`, 'error');
  }
}

async function bulkDelete() {
  const ids = [...state.selected];
  if (!ids.length) return;
  if (!await Components.confirm(`Excluir ${ids.length} pedido(s)?`, 'Pedidos pagos não podem ser excluídos.')) return;
  try {
    const { data: result } = await Api.delete('/orders/bulk', { ids });
    const deleted = result.deleted || [];
    const skipped = result.cannotDelete || [];
    if (deleted.length) Components.toast(`${deleted.length} pedido(s) excluído(s).`, 'success');
    if (skipped.length) {
      Components.toast(`Não foi possível excluir: ${skipped.map((item) => `#${item.id}: ${item.reason}`).join('; ')}`, 'warning', 6000);
    }
    state.selected.clear();
    await loadOrders();
  } catch (error) {
    Components.toast(`Falha na exclusão em massa: ${error.message}`, 'error');
  }
}

function applyFilters() {
  state.page = 1;
  state.clientId = document.getElementById('clientFilter').value;
  state.productId = document.getElementById('productFilter').value;
  state.status = document.getElementById('statusFilter').value;
  state.dateFrom = document.getElementById('dateFrom').value;
  state.dateTo = document.getElementById('dateTo').value;
  state.totalMin = document.getElementById('totalMin').value;
  state.totalMax = document.getElementById('totalMax').value;
  state.discountMin = document.getElementById('discountMin').value;
  state.discountMax = document.getElementById('discountMax').value;
  if (state.dateFrom && state.dateTo && state.dateFrom > state.dateTo) {
    Components.toast('A data inicial deve ser anterior à data final.', 'warning');
    return;
  }
  if (state.totalMin && state.totalMax && Number(state.totalMin) > Number(state.totalMax)) {
    Components.toast('O total mínimo não pode ser maior que o total máximo.', 'warning');
    return;
  }
  if (state.discountMin && state.discountMax && Number(state.discountMin) > Number(state.discountMax)) {
    Components.toast('O desconto mínimo não pode ser maior que o máximo.', 'warning');
    return;
  }
  loadOrders();
}

function bindEvents() {
  document.getElementById('btnNew').addEventListener('click', openCreate);
  document.getElementById('btnSave').addEventListener('click', saveOrder);
  document.getElementById('btnAddItem').addEventListener('click', () => addItemRow());
  document.getElementById('btnBulkDelete').addEventListener('click', bulkDelete);
  document.getElementById('fieldDiscount').addEventListener('input', recalculate);
  document.getElementById('btnClearSelection').addEventListener('click', () => {
    state.selected.clear();
    document.getElementById('selectAll').checked = false;
    document.querySelectorAll('.row-check').forEach((checkbox) => { checkbox.checked = false; });
    updateSelection();
  });
  document.getElementById('selectAll').addEventListener('change', (event) => {
    document.querySelectorAll('.row-check').forEach((checkbox) => {
      checkbox.checked = event.target.checked;
      const id = Number(checkbox.dataset.id);
      event.target.checked ? state.selected.add(id) : state.selected.delete(id);
    });
    updateSelection();
  });
  document.getElementById('searchInput').addEventListener('input', (event) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.search = event.target.value.trim();
      state.page = 1;
      loadOrders();
    }, 350);
  });
  ['clientFilter', 'productFilter', 'statusFilter', 'dateFrom', 'dateTo', 'totalMin', 'totalMax', 'discountMin', 'discountMax'].forEach((id) => {
    document.getElementById(id).addEventListener('change', applyFilters);
  });
  ['sortBy', 'sortOrder', 'limitSelect'].forEach((id) => {
    document.getElementById(id).addEventListener('change', (event) => {
      if (id === 'sortBy') state.sortBy = event.target.value;
      if (id === 'sortOrder') state.sortOrder = event.target.value;
      if (id === 'limitSelect') state.limit = Number(event.target.value);
      state.page = 1;
      loadOrders();
    });
  });
  document.querySelectorAll('th.sortable').forEach((header) => {
    header.addEventListener('click', () => {
      const field = header.dataset.field;
      state.sortOrder = state.sortBy === field && state.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      state.sortBy = field;
      document.getElementById('sortBy').value = field;
      document.getElementById('sortOrder').value = state.sortOrder;
      loadOrders();
    });
  });
}
